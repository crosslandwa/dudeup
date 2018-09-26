import {
  openModal as openModalGeneric,
  isModalOpenSelector as isModalOpenGeneric
} from '../Modal/interactions'

export const SPLIT_COST_MODAL_ID = 'split-item-cost-modal'

// ------ACTIONS------
export const openModal = () => openModalGeneric(SPLIT_COST_MODAL_ID)

// ------SELECTORS------
export const isModalOpenSelector = state => isModalOpenGeneric(state, SPLIT_COST_MODAL_ID)
