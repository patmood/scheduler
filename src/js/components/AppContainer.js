import React, { PropTypes, Component } from 'react'
import Day from './Day'
import SelectUser from './SelectUser'

export class AppContainer extends Component {

  render () {
    const bootstrapData = `window.__preload_${this.constructor.name} = ${JSON.stringify(this.props)}`
    const { users, days } = this.props
    const dayList = days
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((day, i) => (<Day key={i} day={day} user={this.getUser(day.user_id, users)} />))
    return (
      <div>
        <h1>Hello from App component</h1>
        <h2>Select User:</h2>
        <SelectUser users={users} />
        <h2>Schedule:</h2>
        <div>{dayList}</div>
        <script dangerouslySetInnerHTML={{__html: bootstrapData}} ></script>
      </div>
    )
  }

  getUser (id, userList) {
    return userList.find((user) => user.id === id)
  }
}

AppContainer.propTypes = {
  users: PropTypes.array,
  days: PropTypes.array
}

export default AppContainer
