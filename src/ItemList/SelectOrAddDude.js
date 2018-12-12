import React from 'react'
import AddDudeAndAssignToItemAccordian from './AddDudeAndAssignToItemAccordian'
import DudeList from '../DudeList'
import { WithFlyoutArrowBelow } from '../Accordian/FlyoutArrow'

class SelectOrAddDude extends React.Component {
  constructor (props) {
    super(props)
    this.state = { modalOpen: false }

    const openModal = id => {
      this.setState({ modalOpen: true })
    }

    this.closeModal = () => {
      this.setState({ modalOpen: false })
    }

    this.onChange = e => {
      const dudeId = e.target.value
      if (dudeId === '_add_dude_') {
        openModal()
      } else {
        this.props.onChange(dudeId)
      }
    }
  }

  render () {
    const { itemId, selectedId } = this.props
    return (
      <div>
        <WithFlyoutArrowBelow show={!!this.state.modalOpen} >
          <DudeList
            customActions={[{ id: '_add_dude_', label: 'Item bought by new dude...' }]}
            selectedId={selectedId}
            onChange={this.onChange}
          />
        </WithFlyoutArrowBelow>
        {this.state.modalOpen && (
          <AddDudeAndAssignToItemAccordian close={this.closeModal} itemId={itemId} />
        )}
      </div>
    )
  }
}

export default SelectOrAddDude
