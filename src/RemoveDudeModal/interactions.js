import {
  closeModal as closeModalGeneric,
  openModal as openModalGeneric,
  isModalOpenSelector as isModalOpenGeneric
} from '../Modal/interactions'

export const REMOVE_DUDE_MODAL_ID = 'remove-dude-modal'

// ------ACTIONS------
export const openModal = () => openModalGeneric(REMOVE_DUDE_MODAL_ID)
export const closeModal = closeModalGeneric

// ------SELECTORS------
export const isModalOpenSelector = state => isModalOpenGeneric(state, REMOVE_DUDE_MODAL_ID)
