import dotenv from 'dotenv'
dotenv.load()

import query from 'pg-query'
query.connectionParameters = process.env.DATABASE_URL

export const User = {
  getAll() { return query('SELECT * FROM users') },
  getByName(name)  { return query('SELECT * FROM users WHERE name=$1', [name]) },
  create(userObj) {
    return query(
      'INSERT INTO users (name, created_at, updated_at) VALUES ($1, $2, $3)',
      [userObj.name, new Date(), new Date()]
    )
  },
  deleteByName(name) {
    return query(
      'DELETE FROM users WHERE name=$1',
      [name]
    )
  }
}
