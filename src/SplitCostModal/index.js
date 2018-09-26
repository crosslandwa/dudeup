import React from 'react'
import { connect } from 'react-redux'
import { isModalOpenSelector } from './interactions'
import Modal from '../Modal'
import { RadioList as DudeList } from '../DudeList'

const mapStateToProps = state => ({
  isNonEqualSplit: false,
  isOpen: isModalOpenSelector(state),
  selectedIds: []
})

const SplitCostModal = props => (
  props.isOpen && (
    <Modal onSubmit={console.log} >
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div>
          <label>
            Split equally between
            <input type="radio" checked={!props.isNonEqualSplit} />
          </label>
          <label>
            Split unequally between
            <input type="radio" checked={props.isNonEqualSplit} />
          </label>
        </div>
        <DudeList selectedIds={props.selectedIds}/>
      </div>
    </Modal>
  )
)


export default connect(mapStateToProps)(SplitCostModal)
