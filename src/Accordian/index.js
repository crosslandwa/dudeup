import React from 'react'

class Accordian extends React.Component {
  constructor (props) {
    super(props)

    this.escFunction = event => {
      if (event.keyCode === 27) {
        this.props.onClose()
      }
    }

    this.onSubmit = event => {
      event.preventDefault()
      this.props.onSubmit()
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.escFunction, false)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.escFunction, false)
  }

  render () {
    const { children, onClose, overlay, title } = this.props
    return (
      <div class={overlay ? 'du-accordian du-accordian--overlay' : 'du-accordian'}>
        <div class="du-closing-cross" onClick={onClose} />
        <h3 style={{ margin: '0 0 0.5em 0', maxWidth: 'calc(100% - 2em)' }}>{title}</h3>
        <form onSubmit={this.onSubmit} >
          {children}
        </form>
      </div>
    )
  }
}

export default Accordian
