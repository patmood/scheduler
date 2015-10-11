import React, { PropTypes, Component } from 'react'

export class App extends Component {

  render () {
    const { users } = this.props
    const userList = users.map((user, i) => (<div key={i}>{user.name}-{user.id}</div>))
    return (
      <html>
        <head>
          <title>Scheduler</title>
        </head>
        <body>
          <h1>Hello from JSX</h1>
          <h2>users:</h2>
          <div>{userList}</div>
        </body>
      </html>
    )
  }
}

App.propTypes = {
  users: PropTypes.list
}

export default App
