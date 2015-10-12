import React, { PropTypes, Component } from 'react'
import moment from 'moment'

export class Day extends Component {

  render () {
    const { day, user } = this.props
    return (
      <div>
        { moment(day.date).format('L') }: { user.name }
      </div>
    )
  }
}

Day.propTypes = {
  user: PropTypes.object,
  day: PropTypes.object
}

export default Day
