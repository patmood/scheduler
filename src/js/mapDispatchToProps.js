import uuid from 'uuid'
import request from 'superagent'

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

      // RETRY a few times with https://github.com/tim-kos/node-retry
      dispatch(journalEntry, { optimistic: true }) // -> add extra attribute to say optimistic
        // Need middleware ot handle optimistic option and undo it

      // Server request with journal entry from action above
      request.put('/journal')
        .send(journalEntry)
        .end((err, res) => {
          if (err) console.log(err)
          console.log(res)
        })
      // Update UI to apply or reverse update depending on server response
    },
    deleteUser: (id) => dispatch(deleteUser(id)),
    assignDay: (date, userId) => dispatch(assignDay(date, userId)),
    assignUnavailability: (date, userId) => dispatch(assignUnavailability(date, userId)),
    unassignUnavailability: (unavailabilityId) => dispatch(unassignUnavailability(unavailabilityId)),
  }
}

export default mapDispatchToProps
