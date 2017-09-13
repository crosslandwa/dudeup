import React, { Component } from 'react'
import { connect } from 'react-redux'
import Item from './Item'
import PlusButton from './PlusButton'
import { selectDudesName, selectSelectedDudeId } from './dudes/selectors'
import { selectItemIdsForDude, selectTotalItemCostForDude } from './items/selectors'
import { addItem } from './items/actions'

const styles = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-around',
  borderRadius: 10,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#333333',
  backgroundColor: '#f5d55d',
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
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%'
}

class ItemList extends Component {
  render() {
    return (
      <div>
        <div style={styles} >
          <div style={headerStyle} >
            {this.props.name
              ? `Bought by ${this.props.name}`
              : 'Select a dude above to see bought items'
            }
          </div>
          {this.props.itemIds.map(itemId => <Item key={itemId} id={itemId} />)}
          <div style={footerStyle} >
            {this.props.dudeId && (<div onClick={() => this.props.addItem(this.props.dudeId)}>
              <PlusButton />
            </div>)}
            {this.props.total && (<div>Total spend: {this.props.total}</div>)}
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
