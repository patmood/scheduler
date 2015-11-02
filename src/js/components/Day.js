import React, { PropTypes, Component } from 'react'
import { partial, findWhere } from 'lodash'

export class Day extends Component {

  render () {
    const { day, user, activeUserId, assignDay, assignUnavailability, unassignUnavailability } = this.props
    const activeUserUnavailable = !!findWhere(day.unavailableUsers, { userId: activeUserId })

    return (
      <div style={ activeUserId === user.id
          ? {backgroundColor: 'yellow'}
          : {backgroundColor: activeUserUnavailable ? 'red' : ''} } >
        { day.date }: { day.holidayName ? `[${day.holidayName}]` : user.name }
        { user.id ? '' : <button onClick={partial(assignDay, day.date, activeUserId)} disabled={activeUserUnavailable}>Assign</button>}
        { activeUserUnavailable
          ? <button onClick={partial(unassignUnavailability, day.date, activeUserId)}>Mark Available</button>
          : <button onClick={partial(assignUnavailability, day.date, activeUserId)}>Mark Unavailable</button>
        }
      </div>
    )
  }
}

Day.propTypes = {
  user: PropTypes.object,
  day: PropTypes.object,
  activeUserId: PropTypes.string,
  unavailableUsers: PropTypes.array,
  assignDay: PropTypes.func,
  assignUnavailability: PropTypes.func,
  unassignUnavailability: PropTypes.func,
}

Day.defaultProps = {
  unavailability: {},
}

export default Day
