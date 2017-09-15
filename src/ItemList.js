import React, { Component } from 'react'
import { connect } from 'react-redux'
import Item from './Item'
import { selectDudesName, selectSelectedDudeId } from './dudes/selectors'
import { selectItemIdsForDude, selectTotalItemCostForDude } from './items/selectors'
import { addItem } from './items/actions'
import { black, dusty } from './colours'

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
  border: 'none',
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
          <div style={headerStyle} >
            {this.props.name
              ? `Bought by ${this.props.name}`
              : 'Select a dude above to see bought items...'
            }
          </div>
          {this.props.itemIds.map(itemId => <Item key={itemId} id={itemId} />)}
          <div style={footerStyle} >
            {this.props.dudeId && (
              <input style={addButtonStyle}
                type="button"
                value="add"
                onClick={() => this.props.addItem(this.props.dudeId)}
              />
            )}
            {this.props.dudeId && <div style={totalSpendStyle} >Total spend: {(this.props.total || 0).toFixed(2)}</div>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  dudeId: selectSelectedDudeId(state),
  name: selectSelectedDudeId(state)
    ? selectDudesName(state, selectSelectedDudeId(state))
    : null,
  itemIds: selectSelectedDudeId(state)
    ? selectItemIdsForDude(state, selectSelectedDudeId(state))
    : [],
  total: selectSelectedDudeId(state)
    ? selectTotalItemCostForDude(state, selectSelectedDudeId(state))
    : null,
})

const mapDispatchToProps = (dispatch) => ({
  addItem: (dudeId) => dispatch(addItem(dudeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)
