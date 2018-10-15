import React from 'react'
import AddDudeModal from './AddDudeModal'
import DudeList from '../DudeList'

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
        openModal('addDude')
      } else {
        this.props.onChange(dudeId)
      }
    }
  }

  render () {
    const { itemId, selectedId } = this.props
    return (
      <div style={{ display: 'inline-block' }}>
        <DudeList
          customActions={[{ id: '_add_dude_', label: 'Add dude' }]}
          selectedId={selectedId}
          onChange={this.onChange}
        />
        {this.state.modalOpen && (
          <AddDudeModal closeModal={this.closeModal} itemId={itemId} />
        )}
      </div>
    )
  }
}

export default SelectOrAddDude
