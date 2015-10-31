import React, { PropTypes, Component } from 'react'
import moment from 'moment'

export class Day extends Component {

  render () {
    const { day, user, activeUser } = this.props
    return (
      <div style={ activeUser === user.id ? {backgroundColor: 'yellow'} : {}}>
        { moment(new Date(day.date)).format('L') }: { day.holidayName ? `[${day.holidayName}]` : user.name }
      </div>
    )
  }
}

Day.propTypes = {
  user: PropTypes.object,
  day: PropTypes.object,
  activeUser: PropTypes.string,
}

export default Day
