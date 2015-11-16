var repl = require("repl")


var replServer = repl.start({
  prompt: "console > ",
})


var db = require('./libs/db')
replServer.context.db = db
