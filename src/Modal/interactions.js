// ------ACTIONS------
export const closeModal = () => ({ type: 'MODAL_CLOSE' })
export const openModal = id => ({ type: 'MODAL_OPEN', id })

// ------SELECTORS------
export const modalIdSelector = state => state.modal.id

// ------REDUCERS------
export const reducer = (state = { id: undefined }, action) => {
  switch (action.type) {
    case 'MODAL_CLOSE':
      return { ...state, id: undefined }
    case 'MODAL_OPEN':
      return { ...state, id: action.id }
  }
  return state
}
