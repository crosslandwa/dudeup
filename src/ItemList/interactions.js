import { dudeIdsSelector } from '../DudeList/interactions'

// ------ACTIONS------
export const addItem = () => ({ type: 'ITEMLIST_ADD_ITEM' })
export const removeItem = id => ({ type: 'ITEMLIST_REMOVE_ITEM', id })
export const updateItemDescription = (id, description) => ({ type: 'ITEMLIST_UPDATE_ITEM_DESCRIPTION', id, description })
export const updateItemPrice = (id, price) => ({ type: 'ITEMLIST_UPDATE_ITEM_PRICE', id, price })
export const updateItemDude = (id, dudeId) => ({ type: 'ITEMLIST_UPDATE_ITEM_DUDE', id, dudeId })
export const updateItemIsUnequalSplit = (id, isUnequalSplit) => ({ type: 'ITEMLIST_UPDATE_ITEM_UNEQUAL_SPLIT', id, isUnequalSplit })
export const updateItemSharedByDudes = (id, dudeIds) => ({ type: 'ITEMLIST_UPDATE_ITEM_SHARED_BY_DUDES', id, dudeIds })

// ------SELECTORS------
export const itemIdsSelector = state => state.persisted.items.allIds
const itemSelector = (state, id) => state.persisted.items.byId[id]
export const itemDescriptionSelector = (state, id) => itemSelector(state, id).description
export const itemPriceSelector = (state, id) => itemSelector(state, id).price
export const itemDudeSelector = (state, id) => itemSelector(state, id).dudeId
export const itemIdsForDudeSelector = (state, dudeId) => itemIdsSelector(state)
  .filter(itemId => itemDudeSelector(state, itemId) === dudeId)
export const itemIsUnequalSplitSelector = (state, id) => itemSelector(state, id).isUnequalSplit
export const itemSharedByDudeIdsSelector = (state, id) => itemSelector(state, id).sharedByDudes || dudeIdsSelector(state)

// ------REDUCERS------
const defaultItemState = {
  description: '',
  dudeId: undefined,
  isUnequalSplit: false,
  price: 0,
  sharedByDudes: undefined
}

const item = (state = defaultItemState, action) => {
  switch (action.type) {
    case 'ITEMLIST_UPDATE_ITEM_DESCRIPTION':
      return { ...state, description: action.description }
    case 'ITEMLIST_UPDATE_ITEM_PRICE':
      return { ...state, price: parseInt(action.price * 100) / 100 }
    case 'ITEMLIST_UPDATE_ITEM_DUDE':
      return { ...state, dudeId: action.dudeId || undefined }
    case 'ITEMLIST_UPDATE_ITEM_UNEQUAL_SPLIT':
      return { ...state, isUnequalSplit: !!action.isUnequalSplit }
    case 'ITEMLIST_UPDATE_ITEM_SHARED_BY_DUDES':
      return { ...state, sharedByDudes: action.dudeIds }
  }
  return state
}

export const reducer = (state = { allIds: ['item-1'], byId: { 'item-1': item(undefined, {}) } }, action) => {
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
  }
  return (action.type.startsWith('ITEMLIST_UPDATE_ITEM') && action.id)
    ? { ...state, byId: { ...state.byId, [action.id]: item(state.byId[action.id], action) } }
    : state
}

// ------MIDDLEWARE------
export function middleware (store) {
  return (next) => (action) => {
    switch (action.type) {
      case 'DUDELIST_REMOVE_DUDE':
        itemIdsForDudeSelector(store.getState(), action.id)
          .map(itemId => next(updateItemDude(itemId, undefined)))
        break
      case 'ITEMLIST_REMOVE_ITEM':
        next(action)
        if (!itemIdsSelector(store.getState()).length) {
          next(addItem())
        }
        return
    }
    next(action)
  }
}
