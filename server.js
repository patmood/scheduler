import dotenv from 'dotenv'
dotenv.load()

import Promise from 'bluebird'
global.Promise = Promise
import koa from 'koa'
import route from 'koa-route'
import send from 'koa-send'

import { User } from './libs/Entities'

const app = koa()

// Log request times
app.use(function * (next) {
  const start = process.hrtime()
  yield next
  console.log(process.hrtime(start), this.request.path)
})

// Serve up index template
app.use(route.get('/', function * () {
  yield send(this, __dirname + '/index.html')
}))

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

app.use(function * (next) {
  const {request, response} = this
  response.body = 'hello world'
})

app.listen(7777, () => console.log('Listening on 7777') )
