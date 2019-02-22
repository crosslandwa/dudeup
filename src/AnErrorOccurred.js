import React from 'react'
import { connect } from 'react-redux'
import Section from './GenericUi/Section'
import { clear } from './Clear/interactions'
import { secondaryTextButtonStyle } from './styles'

class AnErrorOccurred extends React.Component {
  constructor (props) {
    super(props)
    this.state = { error: undefined }
    this.reset = () => {
      this.setState({ error: undefined })
      this.props.clear()
    }
  }

  componentDidCatch (error, info) {
    this.setState({ error })
  }

  render () {
    return this.state.error ? (
      <Section title="Dude...">
        <div>
          I'm sorry, something went wrong, my bad. Try hitting the Reset button below...
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
          <input style={secondaryTextButtonStyle} type="button" onClick={this.reset} value="Reset" />
        </div>
      </Section>
    ) : this.props.children
  }
}
export default connect(null, { clear })(AnErrorOccurred)
