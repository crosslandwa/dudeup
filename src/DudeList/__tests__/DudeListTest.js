import createStore from '../../store'
import { addDude, removeDude, dudeIdsSelector, dudeNameSelector, lastAddedDudeSelector } from '../interactions'

describe('Dude List', () => {
  it('can have Dudes added', () => {
    const store = createStore()

    expect(dudeIdsSelector(store.getState())).toHaveLength(0)

    store.dispatch(addDude('person 1'))
    store.dispatch(addDude('person 2'))

    const dudeIds = dudeIdsSelector(store.getState())

    expect(dudeIds).toHaveLength(2)

    const lastAddedId = lastAddedDudeSelector(store.getState())
    expect(dudeNameSelector(store.getState(), lastAddedId)).toEqual('person 2')
  })

  it('can have Dudes removed', () => {
    const store = createStore()

    store.dispatch(addDude('person 1'))

    const dudeId = lastAddedDudeSelector(store.getState())

    store.dispatch(removeDude(dudeId))

    expect(dudeIdsSelector(store.getState())).toHaveLength(0)
  })
})
