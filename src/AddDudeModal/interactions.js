import {
  closeModal,
  isModalOpenSelector as isModalOpenGeneric,
  modalDataSelector as modalDataGeneric,
  openModal as openModalGeneric
} from '../Modal/interactions'
import { addDude, lastAddedDudeSelector } from '../DudeList/interactions'
import { updateItemBoughtBy } from '../ItemList/interactions'

export const ADD_DUDE_MODAL_ID = 'add-dude-modal'

// ------ACTIONS------
export const openModal = itemId => openModalGeneric(ADD_DUDE_MODAL_ID, { itemId })
export const modalAddDude = (name, itemId) => ({ type: 'ADD_DUDE_MODAL_ADD_DUDE', name, itemId })

// ------SELECTORS------
export const isModalOpenSelector = state => isModalOpenGeneric(state, ADD_DUDE_MODAL_ID)
export const modalItemIdSelector = state => modalDataGeneric(state).itemId

// ------MIDDLEWARE------
export function middleware (store) {
  return (next) => (action) => {
    switch (action.type) {
      case 'ADD_DUDE_MODAL_ADD_DUDE':
        next(addDude(action.name))
        if (action.itemId) {
          next(updateItemBoughtBy(action.itemId, lastAddedDudeSelector(store.getState())))
        }
        next(closeModal())
        return
    }
    next(action)
  }
}
