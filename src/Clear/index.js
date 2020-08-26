import React from 'react'
import { connect } from 'react-redux'
import { clear } from './interactions'
import Accordian from '../Accordian'
import { addDeleteNotification } from '../Notifications/interactions'
import { closeAccordian, openAccordian, isAccordianOpen } from '../Accordian/interactions'

const mapStateToProps = state => ({
  showClear: isAccordianOpen(state, 'clear')
})

const mapDispatchToProps = dispatch => ({
  clear: () => {
    dispatch(clear())
    dispatch(addDeleteNotification('All Dudes and Items have been cleared'))
    dispatch(closeAccordian())
  },
  closeClearAccordion: () => dispatch(closeAccordian()),
  openClearAccordion: () => dispatch(openAccordian('clear'))
})

const Clear = ({ clear, closeClearAccordion, openClearAccordion, showClear }) => (
  <>
    <button class={`du-button du-button--text-only du-button--header ${showClear ? 'du-flyout--below' : ''}`} onClick={openClearAccordion}>
      <span class="du-button__label">Clear</span>
    </button>
    {showClear && (
      <div class="du-full-width-container__outer">
        <div class="du-full-width-container__inner">
          <Accordian overlay="true" onClose={closeClearAccordion} onSubmit={clear} title="Clear">
            <div class="du-info-text">Clearing will remove all Dudes and Items from your device. Click the Clear button to proceed</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5em' }}>
              <button class="du-button du-button--delete" type="submit">Clear</button>
              <button autoFocus class="du-button" type="button" onClick={closeClearAccordion}>Cancel</button>
            </div>
            <span><em>This can not be undone</em></span>
          </Accordian>
        </div>
      </div>
    )}
  </>
)

export default connect(mapStateToProps, mapDispatchToProps)(Clear)
