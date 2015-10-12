import React, { PropTypes, Component } from 'react'

export class Html extends Component {

  render () {
    return (
      <html>
        <head>
          <title>Scheduler</title>
        </head>
        <body>
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
