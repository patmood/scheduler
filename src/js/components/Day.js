import React, { PropTypes, Component } from 'react'
import moment from 'moment'

export class Day extends Component {

  render () {
    const { day, user, highlight } = this.props
    return (
      <div style={ highlight ? {backgroundColor: 'yellow'} : {}}>
        { moment(new Date(day.date)).format('L') }: { day.holidayName ? `[${day.holidayName}]` : user.name }
      </div>
    )
  }
}

Day.propTypes = {
  user: PropTypes.object,
  day: PropTypes.object,
  highlight: PropTypes.bool,
}

export default Day
