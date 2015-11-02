import React, { PropTypes, Component } from 'react'
import { partial } from 'lodash'

export class Day extends Component {

  render () {
    const { day, user, activeUserId, assignDay } = this.props

    return (
      <div style={ activeUserId === user.id ? {backgroundColor: 'yellow'} : {}}>
        { day.date }: { day.holidayName ? `[${day.holidayName}]` : user.name }
        { user.id ? '' :<button onClick={partial(assignDay, day.date, activeUserId)}>Assign</button>}
      </div>
    )
  }
}

Day.propTypes = {
  user: PropTypes.object,
  day: PropTypes.object,
  activeUserId: PropTypes.string,
  assignDay: PropTypes.func,
}

export default Day
