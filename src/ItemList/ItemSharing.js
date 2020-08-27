import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector, dudeNameSelector } from '../DudeList/interactions'
import PriceInput from '../GenericUi/PriceInput'

const mapStateToProps = (state, { price = 0, hasExplicitSharingAmounts, sharedByDudes }) => {
  const allDudeIds = dudeIdsSelector(state)
  const numberOfDudesSharing = sharedByDudes.length || allDudeIds.length
  const amountPerDude = hasExplicitSharingAmounts
    ? 0
    : (price / (numberOfDudesSharing || 1)).toFixed(2)
  return {
    allDudeIds,
    amountPerDude,
    sharedByDudeIds: sharedByDudes.map(({ dudeId }) => dudeId),
    sharedByDudeAmounts: sharedByDudes.reduce(
      (acc, { dudeId, amount }) => ({ ...acc, [dudeId]: amount }),
      {}
    )
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

const ItemSharing = ({ allDudeIds, amountPerDude, sharedByDudeAmounts, sharedByDudeIds, shareByEveryone, toggleDudesInvolvement, updateIndividualAmount }) => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <CheckBox id="_everyone_" label={<strong>Everyone</strong>} onChange={shareByEveryone} selected={!sharedByDudeIds.length} />
      {!sharedByDudeIds.length && (
        <span>Amount each: {amountPerDude}</span>
      )}
    </div>
    {allDudeIds.map(dudeId => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CheckBoxOption
          id={dudeId}
          selected={sharedByDudeIds.includes(dudeId)}
          onChange={e => toggleDudesInvolvement(dudeId, e.target.checked)}
        />
        {sharedByDudeIds.includes(dudeId) && (
          <label>
            <span style={{ marginRight: '0.5em' }}>Amount:</span>
            <PriceInput
              price={sharedByDudeAmounts[dudeId]}
              placeholder={amountPerDude}
              onChange={e => updateIndividualAmount(dudeId, e.target.value)}
            />
          </label>
        )}
      </div>
    ))}
  </>
)

export default connect(mapStateToProps)(ItemSharing)
