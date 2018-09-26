import React from 'react'
import Clear from './Clear'

class AnErrorOccurred extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
    this.reset = () => {
      this.setState({ hasError: false })
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
  }

  render() {
    return this.state.hasError ? (
      <div onClick={this.reset}>
        Dude! I'm sorry, something went wrong, my bad. Try hitting the clear button to reset the app...
        <Clear />
      </div>
    ) : this.props.children
  }
}
export default AnErrorOccurred
