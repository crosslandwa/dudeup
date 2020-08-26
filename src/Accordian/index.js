import React from 'react'
import { connect } from 'react-redux'

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
  }

  componentDidMount () {
    document.addEventListener('keydown', this.escFunction, false)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.escFunction, false)
  }

  render () {
    const { children, closeExplicit, onSubmit, overlay, title } = this.props
    return (
      <div class={overlay ? 'du-accordian du-accordian--overlay' : 'du-accordian'}>
        <div class="du-closing-cross" onClick={closeExplicit} />
        <h3 style={{ margin: '0 0 0.5em 0', maxWidth: 'calc(100% - 2em)' }}>{title}</h3>
        <form onSubmit={onSubmit} >
          {children}
        </form>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Accordian)
