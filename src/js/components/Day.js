import React, { PropTypes, Component } from 'react'
import partial from 'lodash'
// import moment from 'moment'

export class Day extends Component {

  render () {
    const { day, user, activeUser, assignDay } = this.props

    return (
      <div style={ activeUser === user.id ? {backgroundColor: 'yellow'} : {}}>
        { day.date }: { day.holidayName ? `[${day.holidayName}]` : user.name }
        <button onClick={this.assignToActive.bind(this)}>Assign</button>
      </div>
    )
  }

  assignToActive () {
    const { day, user, activeUser, assignDay } = this.props
    assignDay(day.date, activeUser)
  }
}

Day.propTypes = {
  user: PropTypes.object,
  day: PropTypes.object,
  activeUser: PropTypes.string,
  assignDay: PropTypes.func,
}

export default Day
