// ------ACTIONS------
export const closeModal = () => ({ type: 'MODAL_CLOSE' })
export const openModal = (id, data = {}) => ({ type: 'MODAL_OPEN', id, data })

// ------SELECTORS------
const modalIdSelector = state => state.modal.id
export const isModalOpenSelector = (state, id) => modalIdSelector(state) === id
export const modalDataSelector = (state) => state.modal.data

// ------REDUCERS------
export const reducer = (state = { id: undefined, data: {} }, action) => {
  switch (action.type) {
    case 'MODAL_CLOSE':
      return { ...state, id: undefined, data: {} }
    case 'MODAL_OPEN':
      return { ...state, id: action.id, data: action.data }
  }
  return state
}
