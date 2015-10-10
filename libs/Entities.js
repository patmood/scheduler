import dotenv from 'dotenv'
dotenv.load()

import query from 'pg-query'
query.connectionParameters = process.env.DATABASE_URL

export const User = {
  getAll () { return query('SELECT * FROM users') },
  get (id) { return query('SELECT * FROM users WHERE id=$1', [id]) },
  getByName (name) { return query('SELECT * FROM users WHERE name=$1', [name]) },
  create (userObj) {
    console.log('creating user:', userObj.name)
    return query(
      'INSERT INTO users (name, created_at, updated_at) VALUES ($1, $2, $3)',
      [userObj.name, new Date(), new Date()]
    )
  },
  deleteByName (name) {
    return query(
      'DELETE FROM users WHERE name=$1',
      [name]
    )
  },
  deleteAll () { return query('TRUNCATE users CASCADE') }
}

export const Day = {
  create (date, user_id) {
    console.log('creating day:', date)
    return query(
      'INSERT INTO days (date, user_id) VALUES ($1, $2)',
      [date, null]
    )
  },
  assignToUser (dayId, userId) {
    console.log(`assigning day ${dayId} to user ${userId}`)
    return query(
      'UPDATE days SET user_id=$2 WHERE id=$1',
      [dayId, userId]
    )
  },
  deleteAll () {
    console.log('deleting all')
    return query('TRUNCATE days CASCADE')
  }
}

// Day.assignToUser(5, 60).then((data) => console.log(data), (err) => console.log(err))
