import dotenv from 'dotenv'
dotenv.load()

require('babel/register')

import Promise from 'bluebird'
global.Promise = Promise
import koa from 'koa'
import route from 'koa-route'
import send from 'koa-send'
import React from 'react'
import ReactDOM from 'react-dom/server'

import { User, Day } from './libs/Entities'
import AppContainer from './src/js/components/AppContainer'
import Html from './src/js/components/Html'

const app = koa()

// Log request times
app.use(function * (next) {
  const start = process.hrtime()
  yield next
  console.log(process.hrtime(start), this.request.path)
})

// Serve up index template
app.use(route.get('/', function * () {
  const rawData = yield Promise.settle([ User.getAll(), Day.getAll() ])
  const data = {
    users: rawData[0].value()[0],
    days: rawData[1].value()[0]
  }
  const body = ReactDOM.renderToString(<AppContainer {...data} />)
  const html = ReactDOM.renderToStaticMarkup(<Html body={body} />)
  this.body = '<!doctype html>\n' + html
  // yield send(this, __dirname + '/index.html')
}))

// Serve static assets
app.use(function *() {
  yield send(this, this.path, { root: __dirname + '/dist' })
})

// API
app.use(route.get('/api/v1/users', function * () {
  const data = yield User.getAll()
  this.body = data[0]
}))

app.use(route.get('/api/v1/users/:id', function * (id) {
  const data = yield User.get(id)
  this.body = data[0]
}))

// TODO: switch to koa-router to handle POST requests
// app.use(route.post('/api/v1/users', function * () {
//   const data = yield User.create()
// }))

// app.use(function * (next) {
//   const { request, response } = this
//   response.body = 'hello world'
// })

app.listen(7777, () => console.info('🌎 Listening on 7777'))
