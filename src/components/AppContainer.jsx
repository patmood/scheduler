import React, { PropTypes, Component } from 'react'
import moment from 'moment'

export class App extends Component {

  render () {
    const { users, days } = this.props
    const userList = users.map((user, i) => (<div key={i}>{user.name}-{user.id}</div>))
    const dayList = days.map((day, i) => (<div key={i}>{moment(day.date).calendar()}-{day.id}-{day.user_id}</div>))
    return (
      <div>
        <h1>Hello from App component</h1>
        <h2>users:</h2>
        <div>{userList}</div>
        <h2>days:</h2>
        <div>{dayList}</div>
      </div>
    )
  }
}

App.propTypes = {
  users: PropTypes.array,
  days: PropTypes.array
}

export default App
