import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Day from './Day'
import SelectUser from './SelectUser'
import AddUser from './AddUser'
import { addUser, selectUser, deleteUser } from '../actions'
import { partial } from 'lodash'

export class App extends Component {

  render () {
    // console.log(this.props)
    const { users, days, activeUser, selectUser, addUser, deleteUser } = this.props
    console.log(days)
    const dayList = days
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((day) => Object.assign({}, day, {user: users[day.userId]}))

    return (
      <div>
        <h1>Hello from App component</h1>
        <div>Active User: {activeUser}</div>
        <SelectUser {...{users, selectUser}} />
        <AddUser addUser={addUser} />
        <button onClick={partial(deleteUser, activeUser)} disabled={!activeUser} >Delete This User</button>
        <h2>Schedule:</h2>
        <div>
          {dayList.map((day, i) =>
            <Day key={i}
              day={day}
              user={day.user}
              highlight={day.user_id === activeUser}/>
          )}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  users: PropTypes.object,
  days: PropTypes.array,
  activeUser: PropTypes.string,
  onSelectUser: PropTypes.func,
  onAddUser: PropTypes.func,
  onDeleteUser: PropTypes.func,
}

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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
