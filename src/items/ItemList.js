import React, { Component } from 'react'
import { connect } from 'react-redux'
import Item from './Item'
import { selectDudesName } from '../dudes/selectors'
import { selectItemIdsForDude, selectTotalItemCostForDude } from './selectors'
import { addItem } from './actions'
import { dusty } from '../colours'

const styles = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-around',
  borderRadius: 5,
  backgroundColor: dusty,
  alignItems: 'center'
}

const headerStyle = {
  lineHeight: '30px',
  fontWeight: 'bold',
  textAlign: 'left',
  marginLeft: '2px'
}

const footerStyle = {
  height: '60px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%'
}

const addButtonStyle = {
  background: 'none',
  border: 'solid 1px',
  font: 'inherit',
  cursor: 'pointer',
  marginLeft: '1%',
  width: '15%',
  height: '30px',
  fontSize: 'inherit',
  borderRadius: 5,
}

const totalSpendStyle = {
  width: '90%',
  textAlign: 'right',
  marginRight: '2%'
}

class ItemList extends Component {
  render() {
    return (
      <div>
        <div style={styles} >
          <div style={headerStyle} >Paid for by {this.props.name}</div>
          {this.props.itemIds.map(itemId => <Item key={itemId} id={itemId} />)}
          <div style={footerStyle} >
            <input style={addButtonStyle}
              type="button"
              value="Add"
              onClick={this.props.addItem}
            />
            <div style={totalSpendStyle} >Total spend: {(this.props.total || 0).toFixed(2)}</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, { selectedDudeId }) => ({
  name: selectedDudeId
    ? selectDudesName(state, selectedDudeId)
    : null,
  itemIds: selectedDudeId
    ? selectItemIdsForDude(state, selectedDudeId)
    : [],
  total: selectedDudeId
    ? selectTotalItemCostForDude(state, selectedDudeId)
    : null,
})

const mapDispatchToProps = (dispatch, { selectedDudeId }) => ({
  addItem: () => dispatch(addItem(selectedDudeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)
