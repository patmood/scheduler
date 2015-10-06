import fs from 'fs'
import Promise from 'bluebird'
Promise.promisifyAll(fs)
global.Promise = Promise
import koa from 'koa'
import route from 'koa-route'

const app = koa()

// Log request times
app.use(function * (next) {
  const start = process.hrtime()
  yield next
  console.log(process.hrtime(start), this.request.path)
})

// Serve up index template
app.use(route.get('/', function * () {
  this.body = fs.createReadStream('index.html', 'utf8')
}))

app.use(function * (next) {
  const {request, response} = this
  response.body = 'hello world'
})

app.listen(7777, () => console.log('Listening on 7777') )
