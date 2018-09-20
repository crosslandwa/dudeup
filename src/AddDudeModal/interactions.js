import {
  closeModal,
  openModal as openModalGeneric,
  isModalOpenSelector as isModalOpenGeneric
} from '../Modal/interactions'
import { addDude } from '../DudeList/interactions'

export const ADD_DUDE_MODAL_ID = 'add-dude-modal'

// ------ACTIONS------
export const openModal = () => openModalGeneric(ADD_DUDE_MODAL_ID)
export const modalAddDude = name => ({ type: 'ADD_DUDE_MODAL_ADD_DUDE', name })

// ------SELECTORS------
export const isModalOpenSelector = state => isModalOpenGeneric(state, ADD_DUDE_MODAL_ID)

// ------MIDDLEWARE------
export function middleware (store) {
  return (next) => (action) => {
    switch (action.type) {
      case 'ADD_DUDE_MODAL_ADD_DUDE':
        next(addDude(action.name))
        next(closeModal())
        return
    }
    next(action)
  }
}
