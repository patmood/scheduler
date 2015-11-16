import { generateEntriesReadableStream } from './GenerateTestEntries'
import pg from 'pg'
const dbUrl = 'postgres:///scheduler'
import stream from 'stream'
import QueryStream from 'pg-query-stream'
import query from 'pg-query'
import moment from 'moment'
import { where, pairs } from 'lodash'
import uuid from 'uuid'

query.connectionParameters = process.env.DATABASE_URL || dbUrl

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
    text: 'insert into journal_entries (ts, uuid, type, facts) values ($1, $2, $3, $4)',
    values: [ journalEntry.ts, journalEntry.uuid, journalEntry.type, JSON.stringify(journalEntry.facts) ],
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
  pg.connect(dbUrl, (err, client, done) => {
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
  // console.log('Writing:', JSON.stringify(newEntry))
  const queryObject = journalEntryPgInsert(newEntry)
  // return query(
  //   'if not exists (select uuid from journal_entries where uuid=$2) insert into journal_entries (ts, uuid, type, facts) values ($1, $2, $3, $4) end if',
  //   queryObject.values
  // )

  return new Promise((resolve, reject) => {
    pg.connect(dbUrl, (err, client, done) => {
      if (err) return reject(err)

      client.query('begin')
      client.query('select uuid from journal_entries where uuid=$1', [newEntry.uuid], (err, pgResult) => {
        if (err) return reject(err)
        if (pgResult.rowCount > 0) {
          client.query('commit')
          done()
          return resolve(true)
        }

        // Create new entry
        client.query(queryObject)
        client.query('commit', (err, _pgResult) => {
          if (err) return reject(err)
          done()
          resolve(newEntry)
        })
      })
    })
  })
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
  pg.connect(dbUrl, (err, client, done) => {
    if (err) throw err
    const stream = client.query(qs)
    stream.on('end', done)
    stream.pipe(s)
  })

  return s
}

export const journalEntryReaderAsync = (startTime = new Date(0)) => {
  query.connectionParameters = dbUrl
  return query('select * from journal_entries where ts > $1', [startTime])
}

export const getLastAssignedDay = () => {
  return journalEntryReaderAsync().then((entries) => {
    const days = where(entries[0], {type: 'ASSIGN_DAY'})
      .map((entry) => {
        const facts = JSON.parse(entry.facts)[0]
        return new Date(facts[1])
      })
      .sort()
    return days[days.length - 1]
  })
}

export const assignNextDay = () => {
  return journalEntryReaderAsync().then((entries) => {
    const userDayCount = {}
    const days = where(entries[0], {type: 'ASSIGN_DAY'})
      .map((entry) => {
        const facts = JSON.parse(entry.facts)[0]
        const userId = facts[3]
        userDayCount[userId] = userDayCount[userId]
          ? userDayCount[userId] + 1
          : 1
        return new Date(facts[1])
      })
      .sort()
    const lastDay = days[days.length - 1]

    const nextDay = lastDay
      ? lastDay.setDate(lastDay.getDate() + 1)
      : new Date()

    const userCountPairs = pairs(userDayCount)
    const laziestUserId = userCountPairs.reduce((memo, currentPair) => {
      return currentPair[1] < memo[1] ? currentPair : memo
    }, userCountPairs[0])[0]
    userDayCount[laziestUserId] = userDayCount[laziestUserId] + 1
    const date = moment(nextDay).add(1, 'days').format('L')
    const entry = {
      type: 'ASSIGN_DAY',
      uuid: uuid.v4(),
      ts: new Date(),
      facts: [
        ['assert', date, 'day/user', laziestUserId],
      ],
    }
    return saveEntry(entry)
  })
}

if (!module.parent) {
  // This is run with the reset script
  seed(() => {
    console.log('seeded')
    pg.end()
  })

  // journalEntryReader().on('data', (data) => console.log(data))
}
