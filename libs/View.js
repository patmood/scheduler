// As per Koa streaming html example
var Readable = require('stream').Readable
var inherits = require('util').inherits
var co = require('co')
import * as db from './db'
import JSONStream from 'JSONStream'
import streamToPromise from 'stream-to-promise'

module.exports = View

inherits(View, Readable)

function View (context) {
  Readable.call(this, {})

  // render the view on a different loop
  co.call(this, this.render).catch(context.onerror)
}

View.prototype._read = function () {}

View.prototype.render = function * () {
  // push the <head> immediately
  this.push('<!DOCTYPE html><html><head><title>Hello World</title></head>')
  this.push('<body>')
  this.push('<div id="app"></div><script src="/bundle.js"></script>')

  // Push data here
  const s = db.journalEntryReader()
    .pipe(JSONStream.stringify())

  const script = yield streamToPromise(s)  // Can streams be yeilded another way?
  this.push(`<script>hydrateStore(${script})</script>`)

  // close the document
  this.push('</body></html>')
  // end the stream
  this.push(null)
}
