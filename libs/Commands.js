import startingUsers from '../fixtures/users'
import { User, Day } from './Entities'
import Promise from 'bluebird'

const handleErr = (err) => console.log(err)

export const seed = () => {
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
      console.log(data)
    })
}

export const createMonth = () => {
  return Day.deleteAll()
    .then(() => {
      let promises = []
      for (let i = 0; i < 60; i++) {
        let tempDate = new Date()
        tempDate.setDate(tempDate.getDate() + i)
        promises.push(Day.create(tempDate, null))
      }
      return Promise.all(promises)
    }, handleErr)
    .then((data) => {
      console.log(data)
    }, handleErr)
}

export const createStartingSchedule = () => {
  startingUsers.users.forEach((name, i) => {
    User.getByName(name)
      .then((user) => {
        const userId = user[0][0].id
        let tempDate = new Date()
        tempDate.setDate(tempDate.getDate() + i)
        Day.assignDateToUser(tempDate, userId)
      })
  })
}
