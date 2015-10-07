import dotenv from 'dotenv'
dotenv.load()

import Promise from 'bluebird'
global.Promise = Promise
import koa from 'koa'
import route from 'koa-route'
import send from 'koa-send'

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

app.use(function * (next) {
  const {request, response} = this
  response.body = 'hello world'
})

app.listen(7777, () => console.log('Listening on 7777') )
