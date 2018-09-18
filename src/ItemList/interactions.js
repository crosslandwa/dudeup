// ------ACTIONS------
export const addItem = () => ({ type: 'ITEMLIST_ADD_ITEM' })
export const updateItemDescription = (id, description) => ({ type: 'ITEMLIST_UPDATE_ITEM_DESCRIPTION', id, description })
export const updateItemPrice = (id, price) => ({ type: 'ITEMLIST_UPDATE_ITEM_PRICE', id, price })
export const updateItemDude = (id, dudeId) => ({ type: 'ITEMLIST_UPDATE_ITEM_DUDE', id, dudeId })

// ------SELECTORS------
export const itemIdsSelector = state => state.persisted.items.allIds
const itemSelector = (state, id) => state.persisted.items.byId[id]
export const itemDescriptionSelector = (state, id) => itemSelector(state, id).description
export const itemPriceSelector = (state, id) => itemSelector(state, id).price
export const itemDudeSelector = (state, id) => itemSelector(state, id).dudeId

// ------REDUCERS------
const item = (state = { description: '', price: 0 }, action) => {
  switch (action.type) {
    case 'ITEMLIST_UPDATE_ITEM_DESCRIPTION':
      return { ...state, description: action.description }
    case 'ITEMLIST_UPDATE_ITEM_PRICE':
      return { ...state, price: parseInt(action.price * 100) / 100 }
    case 'ITEMLIST_UPDATE_ITEM_DUDE':
      return { ...state, dudeId: action.dudeId || undefined }
  }
  return state
}

export const reducer = (state = { allIds: [], byId: {} }, action) => {
  switch (action.type) {
    case 'ITEMLIST_ADD_ITEM':
      const id = (state.allIds.length ? Math.max(...state.allIds) : 0) + 1
      return {
        ...state,
        allIds: state.allIds.concat(state.allIds.includes(id) ? [] : id),
        byId: { ...state.byId, [id]: item(state.byId[id], action) }
      }
  }
  return (action.type.startsWith('ITEMLIST_') && action.id)
    ? { ...state, byId: { ...state.byId, [action.id]: item(state.byId[action.id], action) } }
    : state
}
