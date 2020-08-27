import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector, dudeNameSelector } from '../DudeList/interactions'
import PriceInput from '../GenericUi/PriceInput'

const mapStateToProps = (state, { price, individualAmounts, selectedIds }) => {
  const allDudeIds = dudeIdsSelector(state)
  const numberOfDudesSharing = selectedIds.length || allDudeIds.length || 1
  const anyExplicitAmounts = !!Object.keys(individualAmounts).filter(k => individualAmounts[k] > 0).length
  const amountPerDude = anyExplicitAmounts ? 0 : (price / numberOfDudesSharing).toFixed(2)
  return {
    allDudeIds,
    amountPerDude,
    anyExplicitAmounts
  }
}

const mapDudeIdToName = (state, { id }) => ({
  name: dudeNameSelector(state, id)
})

const CheckBox = ({ id, label, onChange, selected }) => (
  <label>
    <input type="checkbox" value={id} checked={selected} onChange={onChange} />
    <span style={{ margin: '0 0.5em' }}>{label}</span>
  </label>
)
const CheckBoxOption = connect(mapDudeIdToName)(props => (
  <CheckBox {...props} label={props.name} />
))

const ItemSharing = ({ allDudeIds, amountPerDude, individualAmounts, selectedIds, shareByEveryone, toggleDudesInvolvement, updateIndividualAmount }) => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <CheckBox id="_everyone_" label={<strong>Everyone</strong>} onChange={shareByEveryone} selected={!selectedIds.length} />
      {!selectedIds.length && (
        <span>Amount each: {amountPerDude}</span>
      )}
    </div>
    {allDudeIds.map(id => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CheckBoxOption id={id} selected={selectedIds.includes(id)} onChange={e => toggleDudesInvolvement(id, e.target.checked)}/>
        {selectedIds.includes(id) && (
          <label>
            <span style={{ marginRight: '0.5em' }}>Amount:</span>
            <PriceInput price={individualAmounts[id]} placeholder={amountPerDude} onChange={e => updateIndividualAmount(id, e.target.value)} />
          </label>
        )}
      </div>
    ))}
  </>
)

export default connect(mapStateToProps)(ItemSharing)
