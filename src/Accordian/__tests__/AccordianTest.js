import createStore from '../../store'
import { closeAccordian, openAccordian, isAccordianOpen } from '../interactions'

describe('Accordian', () => {
  it('can only have a single accordian open at a time', () => {
    const { dispatch, getState } = createStore()

    const accordianA = 'accordianA'
    const accordianB = 'accordianB'
    const accordianC = 'accordianC'

    expect(isAccordianOpen(getState(), accordianA)).toEqual(false)
    expect(isAccordianOpen(getState(), accordianB)).toEqual(false)
    expect(isAccordianOpen(getState(), accordianC)).toEqual(false)

    dispatch(openAccordian(accordianA))

    expect(isAccordianOpen(getState(), accordianA)).toEqual(true)
    expect(isAccordianOpen(getState(), accordianB)).toEqual(false)
    expect(isAccordianOpen(getState(), accordianC)).toEqual(false)

    dispatch(openAccordian(accordianC))

    expect(isAccordianOpen(getState(), accordianA)).toEqual(false)
    expect(isAccordianOpen(getState(), accordianB)).toEqual(false)
    expect(isAccordianOpen(getState(), accordianC)).toEqual(true)

    dispatch(closeAccordian())

    expect(isAccordianOpen(getState(), accordianA)).toEqual(false)
    expect(isAccordianOpen(getState(), accordianB)).toEqual(false)
    expect(isAccordianOpen(getState(), accordianC)).toEqual(false)
  })
})
