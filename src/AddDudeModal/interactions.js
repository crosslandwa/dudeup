import {
  openModal as openModalGeneric,
  isModalOpenSelector
} from '../Modal/interactions'

export const ADD_DUDE_MODAL_ID = 'add-dude-modal'

// ------ACTIONS------
export const openModal = () => openModalGeneric(ADD_DUDE_MODAL_ID)

// ------SELECTORS------
export const isAddDudeModalOpenSelector = state => isModalOpenSelector(state, ADD_DUDE_MODAL_ID)
