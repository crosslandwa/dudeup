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

const CheckBoxOptionWithDudeName = connect(mapDudeIdToName)(props => (
  <CheckboxOption {...props} label={props.name} />
))

const CheckboxOption = ({ checked, id, label, name, onChange, value }) => (
  <div class="du-checkboxes__item">
    <input id={id} class="du-checkboxes__input" name={name} type="checkbox" onChange={onChange} value={value} checked={checked} />
    <label class="du-checkboxes__label" for={id}>{label}</label>
  </div>
)

const ItemSharing = ({ allDudeIds, amountLeft, amountPerDude, hasExplicitSharingAmounts, sharedByDudeAmounts, sharedByDudeIds, shareByEveryone, toggleDudesInvolvement, updateIndividualAmount }) => (
  <>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <CheckboxOption
        id="item-sharing-0"
        checked={!sharedByDudeIds.length}
        label={<strong>Everyone</strong>}
        name="itemSharing"
        onChange={shareByEveryone}
        value="_everyone_"
      />
      {!sharedByDudeIds.length && (
        <span style={{ marginBottom: '0.5em' }}>
          Amount each: {amountPerDude}
        </span>
      )}
      {hasExplicitSharingAmounts && (
        <span style={{ marginBottom: '0.5em' }}>
          Amount left to split: {amountLeft.toFixed(2)}
        </span>
      )}
    </div>
    {allDudeIds.map(dudeId => (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <CheckBoxOptionWithDudeName
          checked={sharedByDudeIds.includes(dudeId)}
          id={dudeId}
          onChange={e => toggleDudesInvolvement(dudeId, e.target.checked)}
          value={dudeId}
        />
        {sharedByDudeIds.includes(dudeId) && (
          <label style={{ marginBottom: '0.5em' }}>
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
