import React from 'react'
import { connect } from 'react-redux'
import { addDude } from './interactions'

const mapDispatchToProps = dispatch => ({
  addDude: event => dispatch(addDude())
})

const AddDudeButton = props => (
  <input type="button" value="Add dude" onClick={ props.addDude } />
)

export default connect(null, mapDispatchToProps)(AddDudeButton)
