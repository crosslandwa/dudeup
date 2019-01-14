import React from 'react'
import { connect } from 'react-redux'
import ClosingCross from './ClosingCross'
import { highlightColor } from '../styles'

const mapDispatchToProps = (dispatch, { onSubmit }) => ({
  onSubmit: event => {
    event.preventDefault()
    onSubmit()
  }
})

class Accordian extends React.Component {
  constructor (props) {
    super(props)

    this.escFunction = event => {
      if (event.keyCode === 27) {
        this.props.closeExplicit()
      }
    }

    this.captureRef = node => {
      this.ref = node
    }

    this.clickOutsideFunction = e => {
      if (this.ref && !this.ref.contains(e.target)) {
        this.props.closeImplicit()
      }
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.escFunction, false)
    document.addEventListener('click', this.clickOutsideFunction, false)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.escFunction, false)
    document.removeEventListener('click', this.clickOutsideFunction, false)
  }

  render () {
    return (
      <div ref={this.captureRef} style={{
        backgroundColor: highlightColor,
        padding: '0.5em',
        margin: '0 -0.5em'
      }}>
        <ClosingCross onClick={this.props.closeExplicit} />
        <h3 style={{ margin: '0 0 0.5em 0' }}>{this.props.title}</h3>
        <form onSubmit={this.props.onSubmit} >
          {this.props.children}
        </form>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Accordian)
