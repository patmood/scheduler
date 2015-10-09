import startingUsers from '../fixtures/users'
import { User } from './Entities'
import Promise from 'bluebird'

const handleErr = (err) => console.log(err)

const seed = () => {
  return User.deleteAll()
    .then(() => {
      const uniqUsers = startingUsers.users.reduce((memo, userName) => {
        if (memo.indexOf(userName) === -1) memo.push(userName)
        return memo
      }, [])

      const promises = uniqUsers.map((userName) => User.create({ name: userName }))
      return Promise.all(promises)
    }, handleErr)
    .then((data) => {
      console.log(data);
    })
}
