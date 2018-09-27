import {
  isModalOpenSelector as isModalOpenGeneric,
  modalDataSelector as modalDataGeneric,
  openModal as openModalGeneric
} from '../Modal/interactions'

export const SPLIT_COST_MODAL_ID = 'split-item-cost-modal'

// ------ACTIONS------
export const openModal = (itemId) => openModalGeneric(SPLIT_COST_MODAL_ID, { itemId })

// ------SELECTORS------
export const isModalOpenSelector = state => isModalOpenGeneric(state, SPLIT_COST_MODAL_ID)
export const modalItemIdSelector = state => modalDataGeneric(state).itemId
