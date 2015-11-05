import React, { PropTypes, Component } from 'react'
import { partial, findWhere } from 'lodash'

// export class Day extends Component {
//
//   render () {
//     const { day, user, activeUserId, assignDay, assignUnavailability, unassignUnavailability } = this.props
//     const activeUserUnavailability = findWhere(day.unavailableUsers, { userId: activeUserId })
//
//     return (
//       <div style={dayStyle(activeUserId, user.id, activeUserUnavailability)} >
//         { day.date }: { day.holidayName ? `[${day.holidayName}]` : user.name }
//         { user.id ? '' : <button onClick={partial(assignDay, day.date, activeUserId)} disabled={!!activeUserUnavailability}>Assign</button>}
//         { activeUserUnavailability
//           ? <button onClick={partial(unassignUnavailability, activeUserUnavailability.id)}>Mark Available</button>
//           : <button onClick={partial(assignUnavailability, day.date, activeUserId)}>Mark Unavailable</button>
//         }
//       </div>
//     )
//   }
//
// }

export const Day =
({ day, user, activeUserId, assignDay, assignUnavailability, unassignUnavailability, activeUserUnavailability }) => (
  activeUserUnavailability = findWhere(day.unavailableUsers, { userId: activeUserId }),
  <div style={dayStyle(activeUserId, user.id, activeUserUnavailability)} >
    { day.date }: { day.holidayName ? `[${day.holidayName}]` : user.name }
    { user.id ? '' : <button onClick={partial(assignDay, day.date, activeUserId)} disabled={!!activeUserUnavailability}>Assign</button>}
    { activeUserUnavailability
      ? <button onClick={partial(unassignUnavailability, activeUserUnavailability.id)}>Mark Available</button>
      : <button onClick={partial(assignUnavailability, day.date, activeUserId)} disabled={user.id === activeUserId}>Mark Unavailable</button>
    }
  </div>
)

Day.propTypes = {
  user: PropTypes.object,
  day: PropTypes.object,
  activeUserId: PropTypes.string,
  unavailableUsers: PropTypes.array,
  assignDay: PropTypes.func,
  assignUnavailability: PropTypes.func,
  unassignUnavailability: PropTypes.func,
}

export const dayStyle = (activeUserId, userId, activeUserUnavailability) => {
  const color =
    activeUserId === userId
    ? 'yellow'
    : activeUserUnavailability
      ? 'red'
      : ''
  return { backgroundColor: color }
}

Day.defaultProps = {
  unavailability: {},
}

export default Day
