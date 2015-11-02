import React, { PropTypes, Component } from 'react'
import { partial } from 'lodash'

export class Day extends Component {

  render () {
    const { day, user, activeUser, assignDay } = this.props

    return (
      <div style={ activeUser.id === user.id ? {backgroundColor: 'yellow'} : {}}>
        { day.date }: { day.holidayName ? `[${day.holidayName}]` : user.name }
        { user.id ? '' :<button onClick={partial(assignDay, day.date, activeUser.id)}>Assign</button>}
      </div>
    )
  }
}

Day.propTypes = {
  user: PropTypes.object,
  day: PropTypes.object,
  activeUser: PropTypes.object,
  assignDay: PropTypes.func,
}

export default Day
