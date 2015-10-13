import { entries } from '../fixtures/mock-journal-entries'
import moment from 'moment'
import Uid from 'sequential-guid'
const uid = new Uid
uid.seed = '00000000-0000-4000-a000-000000000000'

export const generateEntries = (entries) => entries.map(transformEntry)

const transformEntry = (entry) => {
  // Replace timestamp placeholder with real timestamp
  entry = Object.assign({}, entry)
  entry.ts = transformValue(entry.ts)
  entry.facts = entry.facts.map(transformFact)
  return entry
}

const transformFact = (fact) => fact.map(transformValue)

const transformValue = (value) => {
  // If value is object && object has key 'type'
  // generate ts/uuid/day and return
  // else return value
  if (typeof value !== 'object') return value
  if (!value.type) return value
  if (value.type === 'timestamp') return moment('2015-10-12T00:00:00').add(value.value, 'seconds').toDate()
  if (value.type === 'uuid') return uuidFor(value.value)
  if (value.type === 'day') return moment('2015-10-12T00:00:00').add(value.value, 'days').format('L')
  throw new Error('unknown type: ' + value.type)
}

const uuidFor = (integer) => {
  uuidFor[integer] = uuidFor[integer] || uid.next()
  return uuidFor[integer]
}

if (!module.parent) {
  console.log(transformValue({
    type: 'timestamp',
    value: 0,
  })) // Mon Oct 12 2015 00:00:00 GMT-0700 (PDT)

  console.log(transformValue({ type: 'uuid', value: 1 }))  // 00000000-0000-4000-a000-000000000001
}
