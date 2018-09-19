import createStore from '../../store'
import { addDude, dudeIdsSelector } from '../../DudeList/interactions'
import { addItem, itemIdsSelector } from '../../ItemList/interactions'
import { clear } from '../interactions'

describe('Clear', () => {
  it('removes all dudes and items', () => {
    const store = createStore()

    store.dispatch(addDude('person 1'))
    store.dispatch(addItem())

    store.dispatch(clear())

    expect(dudeIdsSelector(store.getState())).toHaveLength(0)
    expect(itemIdsSelector(store.getState())).toHaveLength(1)
  })
})
