import dotenv from 'dotenv'
dotenv.load()

import pg from 'pg'
const connString = process.env.DATABASE_URL

pg.connect(connString, (err, client, done) => {
  if (err) throw err

  client.query("INSERT INTO commands (name, created_at, updated_at) VALUES ($1, $2, $3)", ['lasiehg', new Date(), new Date()], (err, result) => {
    if (err) throw err

    client.query('SELECT * FROM commands', (err, result) => {
      if (err) throw err
      return console.log(result.rows);
    })
  })
})
