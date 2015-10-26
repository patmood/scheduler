import React, { PropTypes, Component } from 'react'

export class SelectUser extends Component {

  render () {
    const { users } = this.props
    const userOptions = users.map((user, i) => <option key={i} value={user.id}>{user.name}</option>)
    return (
      <div>
        <h2>Select User:</h2>
        <select onChange={this.handleChange.bind(this)}>
          <option value='ALL'>All users</option>
          {userOptions}
        </select>
      </div>
    )
  }

  handleChange (e) {
    const id = e.target.value
    this.props.selectUser(id)
  }
}

SelectUser.propTypes = {
  users: PropTypes.array,
  selectUser: PropTypes.func,
}

export default SelectUser
