import React, { PropTypes, Component } from 'react'

export class SelectUser extends Component {

  render () {
    const { users } = this.props
    const userOptions = users.map((user, i) => <option key={i}>{user.name}</option>)
    return (
      <select>
        {userOptions}
      </select>
    )
  }
}

SelectUser.propTypes = {
  users: PropTypes.array
}

export default SelectUser
