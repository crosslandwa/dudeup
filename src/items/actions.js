import { uniqueId } from '../reducers'

export function addItem (dudeId) {
  return { type: 'ITEM_NEW', id: uniqueId('item'), dudeId }
}
