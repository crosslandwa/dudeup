import { clone } from '../reducers'

const initialState = {
  byId: {},
  allIds: []
}

export function itemsReducer (state = initialState, action) {
  switch (action.type) {
    case 'ITEM_NEW':
      return addItem(state, action.id, action.dudeId)
    case 'ITEM_UPDATE_DESCRIPTION':
      return updateDescription(state, action.id, action.description)
    case 'ITEM_UPDATE_PRICE':
      return updatePrice(state, action.id, action.price)
    case 'ITEM_REMOVE':
      return removeItem(state, action.id)
    case 'LIST_REMOVE':
      return initialState
    case 'DUDE_REMOVE':
      return state.allIds.map(id => state.byId[id])
        .filter(item => item.dudeId === action.id)
        .reduce((updated, item) => {
          return removeItem(updated, item.id)
        }, state)
    case 'LIST_RECORD_LOADED':
      return loadItemsFromV1ListRecord(action.record)
    default:
      return state
  }
}

function addItem (state, id, dudeId) {
  const updated = clone(state)
  updated.byId[id] = { id, price: '', description: '', dudeId }
  if (!updated.allIds.includes(id)) {
    updated.allIds = updated.allIds.concat(id)
  }
  return updated
}

function updateDescription(state, id, description) {
  const updated = clone(state)
  updated.byId[id].description = description
  return updated
}

function updatePrice(state, id, price) {
  const updated = clone(state)
  updated.byId[id].price = price
  return updated
}

function removeItem (state, id) {
  const updated = clone(state)
  delete updated.byId[id]
  updated.allIds = updated.allIds.filter(other => other !== id)
  return updated
}

function loadItemsFromV1ListRecord (record) {
  return {
    byId: record.list.dudes.reduce((acc, dude) => {
      dude.items.forEach(item => {
        acc[item.id] = {
          id: item.id,
          description: item.description,
          price: item.price,
          dudeId: dude.id
        }
      })
      return acc
    }, {}),
    allIds: record.list.dudes.reduce((acc, dude) => acc.concat(dude.items.map(item => item.id)), [])
  }
}
