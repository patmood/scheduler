import React, { PropTypes, Component } from 'react'

export class SelectUser extends Component {

  render () {
    const { users } = this.props
    // Comma operator separates a list of EXPRESSIONS and returns the value of the last one (Doesnt work for statements)
    const userOptions = Object.keys(users).map((user) => (user = users[user], <option key={user.id} value={user.id}>{user.name}</option>))
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
  users: PropTypes.object,
  selectUser: PropTypes.func,
}

export default SelectUser
