import React from 'react'
import { connect } from 'react-redux'
import { closeModal } from './interactions'

const mapDispatchToProps = (dispatch, { onSubmit }) => ({
  closeModal: () => dispatch(closeModal()),
  onSubmit: e => {
    event.preventDefault()
    onSubmit()
  }
})

const Modal = props => (
  <div style={{
    width: '100%',
    height: '100%',
    backgroundColor: '#80808080',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  }}>
    <div style={{
      width: '50vw',
      height: '50vw',
      backgroundColor: 'white'
    }}>
      <form onSubmit={props.onSubmit} >
        {props.children}
        <div>
          <input type="button" value="Cancel" onClick={props.closeModal} />
          <input type="submit" value="OK"/>
        </div>
      </form>
    </div>
  </div>
)

export default connect(null, mapDispatchToProps)(Modal)
