import { generateEntriesReadableStream } from './GenerateTestEntries'
import pg from 'pg'
const conString = 'postgres:///scheduler'
import stream from 'stream'
import QueryStream from 'pg-query-stream'
import query from 'pg-query'

// query( {name:'emp_name', text:'select name from emp where emp_id=$1', values:[123]} )

const mock = {
  'name': 'CREATE_USER',
  'ts': '2015-10-12T07:00:00.000Z',
  'facts': [
    [
      'assert',
      '00000000-0000-4000-a000-000000000001',
      'user/name',
      'Patrick',
    ],
  ],
}

const journalEntryPgInsert = (journalEntry) => {
  return {
    name: 'insert_journal_entry',
    text: 'insert into journal_entries (ts, type, facts) values ($1, $2, $3)',
    values: [ journalEntry.ts, journalEntry.type, JSON.stringify(journalEntry.facts) ],
  }
}

export const journalEntryWriter = (client) => {
  return new stream.Writable({
    write: function (chunk, _enc, callback) {
      client.query(journalEntryPgInsert(chunk)).on('error', (err) => callback(err))
      callback()
    },
    objectMode: true,
  })
}

const seed = (callback) => {
  pg.connect(conString, (err, client, done) => {
    if (err) throw err

    generateEntriesReadableStream()
      .pipe(journalEntryWriter(client))
      .on('finish', () => {
        client.on('drain', () => {
          done()
          if (callback) callback()
        })
      })
  })
}

export const saveEntry = (newEntry) => {
  query.connectionParameters = conString
  const queryObject = journalEntryPgInsert(newEntry)
  return query(queryObject.text, queryObject.values)
}

export const journalEntryReader = (startTime = new Date(0)) => {
  // Create a passthrough stream to export
  const s = stream.PassThrough({ objectMode: true })
  // const s = new stream.Transform({
  //   transform: function (chunk, _enc, callback) {
  //     this.push(chunk)
  //     setTimeout(callback, 1000)
  //   },
  //   objectMode: true,
  // })

  const qs = new QueryStream('select * from journal_entries where ts > $1', [startTime])
  pg.connect(conString, (err, client, done) => {
    if (err) throw err
    const stream = client.query(qs)
    stream.on('end', done)
    stream.pipe(s)
  })

  return s
}

if (!module.parent) {
  // This is run with the reset script
  seed(() => {
    console.log('seeded')
    pg.end()
  })

  // journalEntryReader().on('data', (data) => console.log(data))
}
