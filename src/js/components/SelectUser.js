import React, { PropTypes, Component } from 'react'

export class SelectUser extends Component {

  render () {
    const { users } = this.props
    const userOptions = users.map((user, i) => <option key={i} value={user.id}>{user.name}</option>)
    return (
      <select onChange={this.handleChange}>
        <option value='ALL'>All users</option>
        {userOptions}
      </select>
    )
  }

  handleChange (e) {
    console.log('Selected user:', e.target.value)
  }
}

SelectUser.propTypes = {
  users: PropTypes.array
}

export default SelectUser
