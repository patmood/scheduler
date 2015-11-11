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

app.use(route.put('/journal', function * () {
  const { request, response } = this
  const entry = request.body
  entry.ts = new Date()

  console.log(`\x1b[33m${JSON.stringify(entry, null, 2)}\x1b[0m`)

  // Simulate random failure to test optimistic update handling on client
  // if (Math.random() < 0.3) {
    response.status = 502
    return
  // }

  yield db.saveEntry(entry)

  this.type = 'json'
  response.status = 200
  this.body = entry.ts
}))

app.use(route.get('/fillSchedule', function * () {
  this.type = 'json'
  const [entries] = yield db.journalEntryReaderAsync()
  const days = where(entries, {type: 'ASSIGN_DAY'})
    .map((entry) => new Date(JSON.parse(entry.facts)[0][1]))
    .sort()
  const lastDay = days[days.length - 1]

  const monthFromNow = new Date()
  monthFromNow.setDate(monthFromNow.getDate() + 30)

  const daysToAdd = Math.floor((monthFromNow - lastDay) / (1000 * 60 * 60 * 24))

  this.body = daysToAdd
}))

// Serve static assets
app.use(function *() {
  yield send(this, this.path, { root: __dirname + '/dist' })
})

app.listen(7777, () => console.info('🌎 Listening on 7777'))
