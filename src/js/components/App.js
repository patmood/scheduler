import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Day from './Day'
import SelectUser from './SelectUser'
import { selectUser } from '../actions'

export class App extends Component {

  render () {
    console.log(this.props)
    const { users, days, activeUser, onSelectUser } = this.props
    const dayList = days
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((day, i) => {
        return <Day key={i}
                    day={day}
                    user={this.getUser(day.user_id, users)}
                    highlight={day.user_id === activeUser}/>
      })
    return (
      <div>
        <h1>Hello from App component</h1>
        <div>Active User: {activeUser}</div>
        <h2>Select User:</h2>
        <SelectUser users={users} selectUser={onSelectUser} />
        <h2>Schedule:</h2>
        <div>{dayList}</div>
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
  activeUser: PropTypes.number,
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    days: state.days,
    activeUser: state.activeUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectUser: (id) => dispatch(selectUser(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
