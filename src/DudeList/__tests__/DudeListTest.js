import createStore from '../../store'
import { addDude, dudeIdsSelector, dudeNameSelector } from '../interactions'

describe('Dude List', () => {
  it('can have Dudes added', () => {
    const store = createStore()

    expect(dudeIdsSelector(store.getState()).length).toEqual(0)

    store.dispatch(addDude('person 1'))
    store.dispatch(addDude('person 2'))

    const dudeIds = dudeIdsSelector(store.getState())

    expect(dudeIds.length).toEqual(2)

    const lastAddedId = dudeIds.slice(-1)
    expect(dudeNameSelector(store.getState(), lastAddedId)).toEqual('person 2')
  })
})
