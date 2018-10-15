import { addDude, lastAddedDudeSelector } from '../DudeList/interactions'

const roundDown = amount => parseInt(amount * 100) / 100
const uniques = array => [...new Set(array)]

// ------ACTIONS------
export const addDudeAndAssignToItem = (name, itemId) => ({ type: 'ITEMLIST_ADD_DUDE', name, itemId })
export const addItem = () => ({ type: 'ITEMLIST_ADD_ITEM' })
export const removeItem = id => ({ type: 'ITEMLIST_REMOVE_ITEM', id })
export const updateItemBoughtBy = (id, dudeId, price) => ({ type: 'ITEMLIST_UPDATE_ITEM_BOUGHT_BY', id, dudeId, price })
export const updateItemDescription = (id, description) => ({ type: 'ITEMLIST_UPDATE_ITEM_DESCRIPTION', id, description })
export const updateItemCostSplitting = (id, dudeIdToAmount) => ({
  type: 'ITEMLIST_UPDATE_ITEM_COST_SPLITTING',
  id,
  costSplitting: Object.keys(dudeIdToAmount).reduce((acc, dudeId) => ({ ...acc, [dudeId]: roundDown(dudeIdToAmount[dudeId] || 0) }), {})
})

// ------SELECTORS------
export const itemIdsSelector = state => state.persisted.items.allIds
const itemSelector = (state, id) => state.persisted.items.byId[id]
export const itemCostSplittingSelector = (state, id) => itemSelector(state, id).costSplitting
export const itemDescriptionSelector = (state, id) => itemSelector(state, id).description
export const itemIsEqualSplitSelector = (state, id) => {
  const costSplit = itemCostSplittingSelector(state, id)
  const sharingDudeIds = Object.keys(costSplit)
  return (sharingDudeIds.length <= 1) || uniques(sharingDudeIds.map(dudeId => costSplit[dudeId])).length === 1
}
export const itemPriceSelector = (state, id) => itemSelector(state, id).boughtBy.price
export const itemBoughtByDudeIdSelector = (state, id) => itemSelector(state, id).boughtBy.dudeId
export const itemIdsBoughtByDudeSelector = (state, dudeId) => itemIdsSelector(state)
  .filter(itemId => itemBoughtByDudeIdSelector(state, itemId) === dudeId)
export const lastAddedItemIdSelector = state => itemIdsSelector(state).slice(-1)[0]

// ------REDUCERS------
const defaultItemState = {
  boughtBy: {
    dudeId: undefined,
    price: 0
  },
  costSplitting: {},
  description: ''
}

const item = (state = defaultItemState, action) => {
  switch (action.type) {
    case 'ITEMLIST_UPDATE_ITEM_DESCRIPTION':
      return { ...state, description: action.description }
    case 'ITEMLIST_UPDATE_ITEM_BOUGHT_BY':
      return {
        ...state,
        boughtBy: {
          dudeId: action.dudeId || undefined,
          price: action.price ? roundDown(action.price) : state.boughtBy.price
        }
      }
    case 'ITEMLIST_UPDATE_ITEM_COST_SPLITTING':
      return { ...state, costSplitting: action.costSplitting }
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
        itemIdsBoughtByDudeSelector(store.getState(), action.id)
          .map(itemId => next(updateItemBoughtBy(itemId, undefined, itemPriceSelector(store.getState(), itemId))))
        break
      case 'ITEMLIST_ADD_DUDE':
        next(addDude(action.name))
        next(updateItemBoughtBy(action.itemId, lastAddedDudeSelector(store.getState())))
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
