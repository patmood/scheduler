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
import bodyParser from 'koa-body-parser'
import { where } from 'lodash'

import * as db from './libs/db'

const app = koa()

app.use(bodyParser())

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

app.use(route.post('/journal', function * () {
  const { request, response } = this
  const entry = request.body
  entry.ts = new Date()
  // Use body parser middleware. If using request stream how can we separate the body to write to DB?
  yield db.saveEntry(entry)

  this.type = 'json'
  response.status = 200
}))

app.use(route.get('/fillSchedule', function * () {
  this.type = 'json'
  const [entries] = yield db.journalEntryReaderAsync()
  const days = where(entries, {type: 'ASSIGN_DAY'})
    .map((entry) => new Date(JSON.parse(entry.facts)[0][1]))
    .sort()
  const lastDay = days[days.length - 1]

  this.body = lastDay
}))

// Serve static assets
app.use(function *() {
  yield send(this, this.path, { root: __dirname + '/dist' })
})

app.listen(7777, () => console.info('🌎 Listening on 7777'))
