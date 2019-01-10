import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector, dudeNameSelector } from '../DudeList/interactions'
import PriceInput from '../GenericUi/PriceInput'

const mapStateToProps = (state, { itemId }) => ({
  allDudeIds: dudeIdsSelector(state)
})

const mapDudeIdToName = (state, { id }) => ({
  name: dudeNameSelector(state, id)
})

const AmountInputOption = connect(mapDudeIdToName)(props => (
  <label style={{
    display: 'flex',
    justifyContent: 'space-between'
  }}>{props.name}<PriceInput style={{ height: '1.5em' }} {...props} /></label>
))

const ItemSplitting = ({ allDudeIds, amountLeft, individualAmounts, updateIndividualAmount }) => (
  <div>
    {allDudeIds.map(id => (
      <AmountInputOption id={id} price={individualAmounts[id]} onChange={e => updateIndividualAmount(id, e.target.value)} />
    ))}
    <div>You have {amountLeft.toFixed(2)} left to divvy up</div>
  </div>
)

export default connect(mapStateToProps, null)(ItemSplitting)
