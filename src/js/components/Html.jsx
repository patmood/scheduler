import React, { PropTypes, Component } from 'react'

export class Html extends Component {

  render () {
    const bootstrapData = `window.__preload_${this.constructor.name} = ${JSON.stringify(this.props)}`
    return (
      <html>
        <head>
          <title>Scheduler</title>
        </head>
        <body>
          <div id='app' />
          <script dangerouslySetInnerHTML={{__html: bootstrapData}}></script>
          <script src='/bundle.js'></script>
        </body>
      </html>
    )
  }
}

Html.propTypes = {
  users: PropTypes.array,
  days: PropTypes.array,
}

export default Html
