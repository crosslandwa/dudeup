import {
  closeModal,
  openModal as openModalGeneric,
  isModalOpenSelector as isModalOpenGeneric
} from '../Modal/interactions'
import { removeDude } from '../DudeList/interactions'

export const REMOVE_DUDE_MODAL_ID = 'remove-dude-modal'

// ------ACTIONS------
export const openModal = () => openModalGeneric(REMOVE_DUDE_MODAL_ID)
export const modalRemoveDude = id => ({ type: 'REMOVE_DUDE_MODAL_REMOVE_DUDE', id })

// ------SELECTORS------
export const isModalOpenSelector = state => isModalOpenGeneric(state, REMOVE_DUDE_MODAL_ID)

// ------MIDDLEWARE------
export function middleware (store) {
  return (next) => (action) => {
    switch (action.type) {
      case 'REMOVE_DUDE_MODAL_REMOVE_DUDE':
        action.id && next(removeDude(action.id))
        next(closeModal())
        return
    }
    next(action)
  }
}
