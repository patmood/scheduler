import Promise from 'bluebird'
global.Promise = Promise
import koa from 'koa'

const app = koa()

app.use(function * (next) {
  const start = process.hrtime()
  yield next
  console.log(process.hrtime(start), this.request.path)
})

app.use(function * (next) {
  const {request, response} = this
  response.body = 'hello world'
})

app.listen(7777, () => console.log('Listening on 7777') )
