import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import persistState from 'redux-localstorage'
import { reducer as dudes } from './DudeList/interactions'
import { reducer as items, middleware as itemsMiddleware } from './ItemList/interactions'
import { reducer as modal } from './Modal/interactions'
import { resetingReducer } from './Clear/interactions'

const reducer = resetingReducer(combineReducers({
  persisted: combineReducers({
    dudes,
    items
  }),
  modal
}))

const naturalEnhancer = (createStore) => (...args) => createStore(...args)
const isBrowser = typeof window !== 'undefined'
const localStorageAvailable = !!(isBrowser && window.localStorage)
const composeEnhancers = (isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

function createAppStore () {
  const middlewares = [itemsMiddleware]
  return createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(...middlewares),
      localStorageAvailable ? persistState('persisted', { key: 'dude-up' }) : naturalEnhancer
    )
  )
}

export default createAppStore
