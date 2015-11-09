import dotenv from 'dotenv'
dotenv.load()

require('babel/register')

import Promise from 'bluebird'
global.Promise = Promise
import koa from 'koa'
import route from 'koa-route'
import send from 'koa-send'
import stream from 'stream'
import JSONStream from 'JSONStream'
import MultiStream from 'multistream'

import * as db from './libs/db'

const app = koa()

// Log request times
app.use(function * (next) {
  const start = process.hrtime()
  yield next
  console.log(process.hrtime(start), this.request.path)
})

app.use(route.get('/', function * () {
  this.type = 'html'
  // Array to stream
  const ats = (array) =>
  stream.Readable({read: function () {
    this.push(array.shift() || null)
  }})

  const renderStream = MultiStream([
    ats([
      '<!DOCTYPE html><html><head><title>Hello World</title></head>',
      '<body><div id="app"></div><script src="/bundle.js"></script>',
      '<script>hydrateStore(',
    ]),
    db.journalEntryReader().pipe(JSONStream.stringify()),
    ats([
      ')</script>',
      '</body></html>',
    ]),
  ])

  this.body = renderStream
}))

// API
app.use(route.get('/journal', function * () {
  this.type = 'json'
  this.body = db.journalEntryReader()
    .pipe(JSONStream.stringify())
}))

// Serve static assets
app.use(function *() {
  yield send(this, this.path, { root: __dirname + '/dist' })
})

app.listen(7777, () => console.info('🌎 Listening on 7777'))
