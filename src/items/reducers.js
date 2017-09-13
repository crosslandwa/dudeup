import { clone } from '../reducers'

const initialState = {
  byId: {},
  allIds: []
}

const initialItemsState = {
  byId: {
    w: {id: 'w', price: 3, description: 'a one thingy', dudeId: 'a'},
    x: {id: 'x', price: 7.60, description: 'a thingy', dudeId: 'a'},
    y: {id: 'y', price: 8, description: 'goods and stuff', dudeId: 'b'},
    z: {id: 'z', price: 3, description: 'tinned tomatoes', dudeId: 'c'},
  },
  allIds: ['w', 'x', 'y', 'z']
}

export function itemsReducer (state = initialItemsState, action) {
  switch (action.type) {
    case 'ITEM_NEW':
      return addItem(state, action.id, action.dudeId)
  }
  return state
}

function addItem (state, id, dudeId) {
  const updated = clone(state)
  updated.byId[id] = { id, price: 0, description: '', dudeId }
  if (!updated.allIds.includes(id)) {
    updated.allIds = updated.allIds.concat(id)
  }
  return updated
}
