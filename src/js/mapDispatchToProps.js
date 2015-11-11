import uuid from 'uuid'
import request from 'superagent'
import retry from 'retry'

import { addUser, selectUser, deleteUser, assignDay, assignUnavailability, unassignUnavailability } from './actions'

export const mapDispatchToProps = (dispatch) => {
  return {
    selectUser: (id) => {
      dispatch(selectUser(id))
    },
    addUser: (name) => {
      // Optimistic action dispatch
      const journalEntry = addUser(name)
      journalEntry.uuid = uuid()

      dispatch(journalEntry, { optimistic: true }) // -> add extra attribute to say optimistic
        // Need middleware ot handle optimistic option and undo it

      // Server request with journal entry from action above
      retryRequest('/journal', 'put', journalEntry)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
      // Update UI to apply or reverse update depending on server response
    },
    deleteUser: (id) => dispatch(deleteUser(id)),
    assignDay: (date, userId) => dispatch(assignDay(date, userId)),
    assignUnavailability: (date, userId) => dispatch(assignUnavailability(date, userId)),
    unassignUnavailability: (unavailabilityId) => dispatch(unassignUnavailability(unavailabilityId)),
  }
}

export const retryRequest = (url, method = 'get', body) => {
  return new Promise((resolve, reject) => {
    const operation = retry.operation({ retries: 2 })

    operation.attempt(() => {
      request[method](url)
        .send(body)
        .end((err, res) => {
          if (operation.retry(err)) return
          if (err) return reject(err)
          return resolve(res)
        })
    })
  })

}

export default mapDispatchToProps
