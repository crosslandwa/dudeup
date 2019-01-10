// ------ACTIONS------
export const clear = () => ({ type: 'CLEAR_ALL' })

// ------REDUCER------
export const resetingReducer = reducer => (state, action) => {
  return reducer(action.type === 'CLEAR_ALL' ? undefined : state, action)
}
