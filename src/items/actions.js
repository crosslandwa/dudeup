import { uniqueId } from '../reducers'

const rounded = amount => Math.round(amount * 1e2) / 1e2

export function addItem (dudeId) {
  return { type: 'ITEM_NEW', id: uniqueId('item'), dudeId }
}

export function updateItemDescription (id, description) {
  return { type: 'ITEM_UPDATE_DESCRIPTION', id, description }
}

export function updateItemPrice (id, price) {
  return { type: 'ITEM_UPDATE_PRICE', id, price: rounded(price) }
}

export function removeItem (id) {
  return { type: 'ITEM_REMOVE', id }
}
