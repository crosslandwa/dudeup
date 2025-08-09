import React from 'react'
import { connect } from 'react-redux'
import Section from './GenericUi/Section'
import { clear } from './Clear/interactions'

class AnErrorOccurred extends React.Component {
  constructor (props) {
    super(props)
    this.state = { error: undefined }
    this.reset = () => {
      this.setState({ error: undefined })
      this.props.clear()
    }
  }

  componentDidCatch (error) {
    this.setState({ error })
  }

  render () {
    return this.state.error ? (
      <Section title="Dude...">
        <div style={{ marginBottom: '2em' }}>
          I'm sorry, something went wrong, my bad. Try hitting the Reset button below...
        </div>
        <button class="du-button du-button--delete" onClick={this.reset}>Reset</button>
      </Section>
    ) : this.props.children
  }
}
export default connect(null, { clear })(AnErrorOccurred)
