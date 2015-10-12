import React, { PropTypes, Component } from 'react'

export class Html extends Component {

  render () {
    return (
      <html>
        <head>
          <title>Scheduler</title>
        </head>
        <body>
          <h1>Hello from JSX</h1>
          <div id='app' dangerouslySetInnerHTML={{__html: this.props.body}} />
          <script src='/bundle.js'></script>
        </body>
      </html>
    )
  }
}

Html.propTypes = {
  body: PropTypes.string
}

export default Html
