import React from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import { CheckBoxList as DudeList } from '../DudeList'
import { closeModal } from './interactions'
import {
  updateItemIsUnequalSplit, itemIsUnequalSplitSelector,
  itemDescriptionSelector,
  itemSharedByDudeIdsSelector
} from '../ItemList/interactions'

const mapStateToProps = (state, { itemId }) => ({
  isNonEqualSplit: itemIsUnequalSplitSelector(state, itemId),
  itemDescription: itemDescriptionSelector(state, itemId),
  selectedIds: itemSharedByDudeIdsSelector(state, itemId)
})
const mapDispatchToProps = (dispatch, { itemId }) => ({
  updateUnequalSplit: isUnequal => dispatch(updateItemIsUnequalSplit(itemId, isUnequal)),
  closeModal: () => dispatch(closeModal())
})

class CostSplitter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isNonEqualSplit: props.isNonEqualSplit,
      selectedIds: props.selectedIds
    }
    this.setEqualSplit = e => {
      if (e.target.checked) {
        this.setState({ isNonEqualSplit: false })
      }
    }
    this.setNonEqualSplit = e => {
      if (e.target.checked) {
        this.setState({ isNonEqualSplit: true })
      }
    }
    this.submit = () => {
      this.props.updateUnequalSplit(this.state.isNonEqualSplit)
      this.props.closeModal()
    }
  }

  render () {
    return (
      <Modal onSubmit={this.submit} >
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <span>Sharing cost for "{this.props.itemDescription || <em>a mystery item</em>}"</span>
          <div>
            <label>
              Split equally between
              <input type="radio" checked={!this.state.isNonEqualSplit} onChange={this.setEqualSplit} />
            </label>
            <label>
              Split unequally between
              <input type="radio" checked={this.state.isNonEqualSplit} onChange={this.setNonEqualSplit} />
            </label>
          </div>
          <DudeList selectedIds={this.state.selectedIds}/>
        </div>
      </Modal>
    )
  }
}

/*
TODO:
 - collect selected dudes in local state, dispatch single action on submit (allows user to cancel)
 - prevent submission if no dudes selected
*/

export default connect(mapStateToProps, mapDispatchToProps)(CostSplitter)
