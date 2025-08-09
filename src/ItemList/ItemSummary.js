import React from 'react'
import { connect } from 'react-redux'
import {
  itemDescriptionSelector,
  itemBoughtByDudeIdSelector, itemPriceSelector,
  itemSharingLabelSelector
} from './interactions'
import { dudeNameSelector } from '../DudeList/interactions'
import EditItemAccordian from './EditItemAccordian'
import { secondaryTextItalic } from '../styles'
import FocusableDiv from '../GenericUi/FocusableDiv'
import { closeAccordian, openAccordian, isAccordianOpen } from '../Accordian/interactions'

const apply = (f, x) => f(x)

const mapStateToProps = (state, { id }) => ({
  description: itemDescriptionSelector(state, id),
  dude: apply(
    dudeId => dudeId ? dudeNameSelector(state, dudeId) : '',
    itemBoughtByDudeIdSelector(state, id)
  ),
  price: itemPriceSelector(state, id),
  sharingLabel: itemSharingLabelSelector(state, id),
  showAccordian: isAccordianOpen(state, `editItem-${id}`)
})

const mapDispatchToProps = (dispatch, { id }) => ({
  closeItemAccordion: () => dispatch(closeAccordian()),
  openItemAccordion: () => dispatch(openAccordian(`editItem-${id}`))
})

class ItemSummary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { reFocus: false }

    this.toggleEditOpen = () => {
      this.setState(() => {
        if (this.props.showAccordian) {
          this.closeAndRefocus()
        } else {
          this.props.openItemAccordion()
        }
      })
    }

    this.captureRef = node => {
      this.ref = node
    }

    this.closeEditAndRefocus = () => {
      this.props.closeItemAccordion()
      this.setState({ reFocus: true })
    }
  }

  componentDidUpdate () {
    if (this.ref && this.state.reFocus) {
      this.setState(() => {
        this.ref.focus()
        return { reFocus: false }
      })
    }
  }

  render () {
    const { description, dude, id, price, sharingLabel, showAccordian } = this.props
    return (
      <>
        {showAccordian
          ? (
            <EditItemAccordian id={id} onClose={this.closeEditAndRefocus} />
          ) : (
            <FocusableDiv class="du-item-summary" ref={this.captureRef} onClick={this.toggleEditOpen}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <div>
                  {description}
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '5em',
                  textAlign: 'right',
                  padding: '0 0 0 1em'
                }}>
                  <span style={{ width: '100%' }}>{price.toFixed(2)}</span>
                  <span style={{ ...secondaryTextItalic, width: '100%' }}>{dude || '???'}</span>
                </div>
              </div>
              {sharingLabel && (
                <div style={{ ...secondaryTextItalic, marginTop: '0.5em', textAlign: 'center' }}>{sharingLabel}</div>
              )}
            </FocusableDiv>
          )}
        <hr class="du-hr" />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemSummary)
