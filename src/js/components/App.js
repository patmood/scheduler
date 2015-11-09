import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Day from './Day'
import SelectUser from './SelectUser'
import AddUser from './AddUser'
import mapDispatchToProps from '../mapDispatchToProps'
import { partial, where, values } from 'lodash'
import moment from 'moment'

export class App extends Component {
  constructor () {
    super()
    this.state = {
      swapping: {},
    }
  }

  render () {
    const { users, days, activeUserId, selectUser, addUser, deleteUser, assignDay, unavailability, assignUnavailability, unassignUnavailability } = this.props

    const dayList = Object.keys(days).map((k) => days[k])
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((day) => {
        const unavailableUsers = where(unavailability, { date: day.date })
        return Object.assign({}, day, {
          user: users[day.userId] || {},
          unavailableUsers: unavailableUsers,
        })
      })

    const dateToday = moment().format('L')
    console.log('unavail:', this.state.unavailableToSwap)

    return (
      <div>
        <h1>Hello from App component</h1>
        { this.state.unavailableToSwap ? <h1>SWAPPING {this.state.swapping}</h1> : ''}
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
              unassignUnavailability={unassignUnavailability}
              swapDay={this.swapDay.bind(this)}
              swapping={this.state.swapping}
              cancelSwapDay={this.cancelSwapDay.bind(this)} />
          )}
        </div>
        <button onClick={partial(assignDay, dateToday, activeUserId)}>Add Day</button>
      </div>
    )
  }

  swapDay (date, userId) {
    const unavailabilityList = values(this.props.unavailability)
    const unavailableToSwap = where(unavailabilityList, { date })
    this.setState({ swapping: { date, userId, unavailableToSwap } })
  }

  cancelSwapDay () {
    this.setState({
      swapping: {},
    })
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

const mapStateToProps = (state) => state.toJS() // Convert from immutable.js to vanilla js object

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
