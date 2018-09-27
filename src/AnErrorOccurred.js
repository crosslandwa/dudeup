import React from 'react'
import Clear from './Clear'

class AnErrorOccurred extends React.Component {
  constructor (props) {
    super(props)
    this.state = { error: undefined }
    this.reset = () => {
      this.setState({ error: undefined })
    }
  }

  componentDidCatch (error, info) {
    this.setState({ error })
  }

  render () {
    return this.state.error ? (
      <div onClick={this.reset}>
        Dude! I'm sorry, something went wrong, my bad. Try hitting the clear button to reset the app...
        <Clear />
      </div>
    ) : this.props.children
  }
}
export default AnErrorOccurred
