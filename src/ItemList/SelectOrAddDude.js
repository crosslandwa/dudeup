import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector, dudeNameSelector } from '../DudeList/interactions'
import AddDudeModal from './AddDudeModal'
import { dropdownStyle } from '../styles'

const mapStateToProps = state => ({
  dudes: dudeIdsSelector(state).map(id => ({ id, name: dudeNameSelector(state, id) }))
})

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
    const { dudes, itemId, selectedId = '' } = this.props
    return (
      <div style={{ display: 'inline-block' }}>
        <select style={dropdownStyle} value={selectedId} autoFocus onChange={this.onChange}>
          <option value={''} disabled >Select a dude...</option>
          {dudes.map(({ id, name }) => <option value={id}>{name}</option>)}
          <option disabled>───────</option>
          <option value="_add_dude_" >Add dude</option>
        </select>
        {this.state.modalOpen && (
          <AddDudeModal closeModal={this.closeModal} itemId={itemId} />
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(SelectOrAddDude)
