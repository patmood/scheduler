import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Day from './Day'
import SelectUser from './SelectUser'
import AddUser from './AddUser'
import { addUser, selectUser, deleteUser, assignDay, assignUnavailability, unassignUnavailability } from '../actions'
import { partial, where } from 'lodash'
import moment from 'moment'

export class App extends Component {

  render () {
    console.log(this.props)
    const { users, days, activeUserId, selectUser, addUser, deleteUser, assignDay, unavailability, assignUnavailability, unassignUnavailability } = this.props

    const dayList = Object.keys(days).map((k) => days[k])
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((day) => {
        const unavailableUsers = where(unavailability, { date: day.date } )
        return Object.assign({}, day, {
          user: users[day.userId] || {},
          unavailableUsers: unavailableUsers
        })
      })

    const dateToday = moment().format('L')

    return (
      <div>
        <h1>Hello from App component</h1>
        <div>Active User: {activeUserId}</div>
        <SelectUser {...{users, selectUser, activeUserId}} />
        <AddUser addUser={addUser} />
        <button onClick={partial(deleteUser, activeUserId)} disabled={!activeUserId} >Delete This User</button>
        <h2>Schedule:</h2>
        <div>
          {dayList.map((day, i) =>
            <Day key={i}
              day={day}
              user={day.user}
              activeUserId={activeUserId}
              assignDay={assignDay}
              assignUnavailability={assignUnavailability}
              unassignUnavailability={unassignUnavailability} />
          )}
        </div>
        <button onClick={partial(assignDay, dateToday, activeUserId)}>Add Day</button>
      </div>
    )
  }
}

App.propTypes = {
  users: PropTypes.object,
  days: PropTypes.object,
  unavailability: PropTypes.object,
  activeUserId: PropTypes.string,
  selectUser: PropTypes.func,
  addUser: PropTypes.func,
  deleteUser: PropTypes.func,
  assignDay: PropTypes.func,
  assignUnavailability: PropTypes.func,
  unassignUnavailability: PropTypes.func,
}

// QUESTION: Why cant props stay immutable?
const mapStateToProps = (state) => state.toJS() // Convert from immutable.js to vanilla js object

const mapDispatchToProps = (dispatch) => {
  return {
    selectUser: (id) => {
      // Optimistic action dispatch
      const journalEntry = selectUser(id)
      dispatch(journalEntry, { optimistic: true }) // -> add extra attribute to say optimistic
        // Need middleware ot handle optimistic option and undo it
      // Server request with journal entry from action above
      // Update UI to apply or reverse update depending on server response
    },
    addUser: (name) => dispatch(addUser(name)),
    deleteUser: (id) => dispatch(deleteUser(id)),
    assignDay: (date, userId) => dispatch(assignDay(date, userId)),
    assignUnavailability: (date, userId) => dispatch(assignUnavailability(date, userId)),
    unassignUnavailability: (unavailabilityId) => dispatch(unassignUnavailability(unavailabilityId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
