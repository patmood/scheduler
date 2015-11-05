import dotenv from 'dotenv'
dotenv.load()

require('babel/register')

import Promise from 'bluebird'
global.Promise = Promise
import koa from 'koa'
import route from 'koa-route'
import send from 'koa-send'
import stream from 'stream'
import React from 'react'
import ReactDOM from 'react-dom/server'
import JSONStream from 'JSONStream'
import MultiStream from 'multistream'

import { User, Day } from './libs/Entities'
import App from './src/js/components/App'

import * as db from './libs/db'

import View from './libs/View'
const app = koa()

// Log request times
app.use(function * (next) {
  const start = process.hrtime()
  yield next
  console.log(process.hrtime(start), this.request.path)
})

// Serve up index template
app.use(route.get('/', function * () {
  // const rawData = yield Promise.settle([ User.getAll(), Day.getAll() ])
  // const data = {
  //   users: rawData[0].value()[0],
  //   days: rawData[1].value()[0],
  // }

  // Render template but not inital react component
  // const body = ReactDOM.renderToString(<App {...data} />)
  // const html = ReactDOM.renderToStaticMarkup(<Html {...data} />) // first write event
  // second write is script tag
  // this.body = '<!doctype html>\n' + html

  // CO STREAM VIEW ATTEMPT
  // this.type = 'html'
  // this.body = new View(this)

  // PURE STREAM ATTEMPT
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

app.use(route.get('/api/v1/users', function * () {
  const data = yield User.getAll()
  this.body = data[0]
}))

app.use(route.get('/api/v1/users/:id', function * (id) {
  const data = yield User.get(id)
  this.body = data[0]
}))

// Serve static assets
app.use(function *() {
  yield send(this, this.path, { root: __dirname + '/dist' })
})

app.listen(7777, () => console.info('🌎 Listening on 7777'))
