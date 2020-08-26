import { dudeNameSelector } from '../DudeList/interactions'
import { addDeleteNotification, addNotification } from '../Notifications/interactions'

const roundDown = amount => Math.round(amount * 100) / 100
const apply = (f, x) => f(x)

// ------ACTIONS------
export const addItem = (description, dudeId, price, costSplitting = []) => ({
  type: 'ITEMLIST_ADD_ITEM',
  description,
  dudeId,
  itemSplit: Array.isArray(costSplitting) ? {} : Object.keys(costSplitting)
    .map(dudeId => ({ dudeId, amount: roundDown(costSplitting[dudeId]) || 0 }))
    .filter(({ amount }) => amount > 0)
    .reduce((acc, { dudeId, amount }) => ({ ...acc, [dudeId]: amount }), {}),
  price,
  sharedByDudeIds: Array.isArray(costSplitting) ? costSplitting : Object.keys(costSplitting)
})
export const removeItem = id => ({ type: 'ITEMLIST_REMOVE_ITEM', id })
export const updateItem = (id, description, dudeId, price, costSplitting = []) => ({
  ...addItem(description, dudeId, price, costSplitting),
  type: 'ITEMLIST_UPDATE_ITEM',
  id
})

// ------SELECTORS------
export const isItemExplicitlySplitSelector = (state, id) => !!Object.keys(itemCostSplitSelector(state, id)).length
export const isDudeInvoledInAnyItemsSelector = (state, dudeId) => !!itemIdsBoughtByDudeSelector(state, dudeId).length ||
  itemIdsSelector(state).reduce((acc, itemId) => acc.concat(itemSharedByDudeIdsSelector(state, itemId)), []).includes(dudeId)
export const itemIdsSelector = state => state.persisted.items.allIds
const itemSelector = (state, id) => state.persisted.items.byId[id]
export const itemDescriptionSelector = (state, id) => itemSelector(state, id).description
export const itemPriceSelector = (state, id) => itemSelector(state, id).boughtBy.price
export const itemBoughtByDudeIdSelector = (state, id) => itemSelector(state, id).boughtBy.dudeId
export const itemCostSplitSelector = (state, id) => itemSelector(state, id).itemSplit
export const itemIdsBoughtByDudeSelector = (state, dudeId) => itemIdsSelector(state)
  .filter(itemId => itemBoughtByDudeIdSelector(state, itemId) === dudeId)
export const itemSharedByDudeIdsSelector = (state, id) => itemSelector(state, id).itemSharedByDudes
export const itemSharingLabelSelector = (state, id) => apply(
  dudeIds => dudeIds.length
    ? apply(
      itemSplit => Object.keys(itemSplit).length
        ? `Split between ${dudeIds.map(dudeId => `${dudeNameSelector(state, dudeId)} (${itemSplit[dudeId].toFixed(2)})`).join(', ')}`
        : `Shared by ${dudeIds.map(dudeId => dudeNameSelector(state, dudeId)).join(', ')}`,
      itemCostSplitSelector(state, id)
    ) : '',
  itemSharedByDudeIdsSelector(state, id)
)
export const lastAddedItemIdSelector = state => itemIdsSelector(state).slice(-1)[0]

// ------REDUCERS------
const defaultItemState = {
  boughtBy: {
    dudeId: undefined,
    price: 0
  },
  description: '',
  itemSharedByDudes: [],
  itemSplit: {}
}

const item = (state = defaultItemState, action) => {
  return {
    ...state,
    boughtBy: {
      dudeId: action.dudeId || undefined,
      price: action.price ? roundDown(action.price) : state.boughtBy.price
    },
    description: action.description,
    itemSharedByDudes: action.sharedByDudeIds,
    itemSplit: action.itemSplit
  }
}

export const reducer = (state = { allIds: [], byId: {} }, action) => {
  switch (action.type) {
    case 'ITEMLIST_ADD_ITEM':
      const id = `item-${(state.allIds.length ? Math.max(...state.allIds.map(x => x.replace('item-', ''))) : 0) + 1}`
      return {
        allIds: state.allIds.concat(state.allIds.includes(id) ? [] : id),
        byId: { ...state.byId, [id]: item(state.byId[id], action) }
      }
    case 'ITEMLIST_REMOVE_ITEM':
      const updatedIds = [...state.allIds]
      updatedIds.splice(state.allIds.indexOf(action.id), 1)
      return {
        allIds: updatedIds,
        byId: { ...state.byId, [action.id]: undefined }
      }
    case 'ITEMLIST_UPDATE_ITEM':
      return { ...state, byId: { ...state.byId, [action.id]: item(state.byId[action.id], action) } }
  }
  return state
}

// ------MIDDLEWARE------
export function middleware (store) {
  return (next) => (action) => {
    switch (action.type) {
      case 'ITEMLIST_ADD_ITEM':
        next(action)
        next(addNotification(`Added new item '${action.description}'`))
        return
      case 'ITEMLIST_REMOVE_ITEM':
        const removedItemDescription = itemDescriptionSelector(store.getState(), action.id)
        next(action)
        next(addDeleteNotification(removedItemDescription ? `Removed item '${removedItemDescription}'` : 'Item removed'))
        return
    }
    next(action)
  }
}
