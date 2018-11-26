import React from 'react'
import { connect } from 'react-redux'
import Accordian from '../Accordian'
import DudeList from '../DudeList'
import { dudeCanBeRemovedSelector, removeDude } from '../DudeList/interactions'

const mapStateToProps = state => ({
  isDudeRemovable: id => dudeCanBeRemovedSelector(state, id)
})

class RemoveDudeAccordian extends React.Component {
  constructor (props) {
    super(props)

    this.state = { id: undefined }

    this.removeDude = () => {
      this.state.id && this.props.removeDude(this.state.id)
      props.close()
    }

    this.selectDude = e => { this.setState({ id: e.target.value }) }
  }

  render () {
    return (
      <Accordian onCancel={this.props.close} onSubmit={this.removeDude} submitButtonText="Remove" title="Remove dude" >
        <DudeList onChange={this.selectDude} filter={this.props.isDudeRemovable} selectedId={this.state.id} />
        <div><em>Dudes who have bought (or are sharing) items can not be removed</em></div>
      </Accordian>
    )
  }
}

export default connect(mapStateToProps, { removeDude })(RemoveDudeAccordian)
