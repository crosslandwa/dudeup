import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import persistState from 'redux-localstorage'
import { reducer as dudes } from './DudeList/interactions'
import { reducer as items } from './ItemList/interactions'
import { reducer as modal } from './Modal/interactions'

const reducer = combineReducers({
  persisted: combineReducers({
    dudes,
    items
  }),
  modal
})
const naturalEnhancer = (createStore) => (...args) => createStore(...args)

const localStorageAvailable = !!(window && window.localStorage) // TODO window is defined when tests run so state is persisted between store instantiations! (needs fixing in bootstrapper too)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function createAppStore () {
  const middlewares = []
  return createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(...middlewares),
      localStorageAvailable ? persistState('persisted', { key: 'dude-up' }) : naturalEnhancer
    )
  )
}

export default createAppStore
