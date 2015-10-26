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
    const dayList = days
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((day) => Object.assign({}, day, {user: this.getUser(day.user_id, users)}))

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

  getUser (id, userList) {
    return userList.find((user) => user.id === id)
  }
}

App.propTypes = {
  users: PropTypes.array,
  days: PropTypes.array,
  activeUser: PropTypes.string,
  onSelectUser: PropTypes.func,
  onAddUser: PropTypes.func,
  onDeleteUser: PropTypes.func,
}

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
  return {
    selectUser: (id) => dispatch(selectUser(id)),
    addUser: (name) => dispatch(addUser(name)),
    deleteUser: (id) => dispatch(deleteUser(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
