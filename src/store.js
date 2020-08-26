import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import persistState from 'redux-localstorage'
import { reducer as accordian, middleware as accordianMiddleware } from './Accordian/interactions'
import { reducer as dudes, middleware as dudesMiddleware } from './DudeList/interactions'
import { reducer as items, middleware as itemsMiddleware } from './ItemList/interactions'
import { reducer as notifications } from './Notifications/interactions'
import { resetingReducer } from './Clear/interactions'

const reducer = resetingReducer(combineReducers({
  persisted: combineReducers({
    dudes,
    items
  }),
  accordian,
  notifications
}))

const naturalEnhancer = (createStore) => (...args) => createStore(...args)
const isBrowser = typeof window !== 'undefined'
const localStorageAvailable = !!(isBrowser && window.localStorage)
const composeEnhancers = (isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

function createAppStore () {
  const middlewares = [accordianMiddleware, itemsMiddleware, dudesMiddleware]
  return createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(...middlewares),
      localStorageAvailable ? persistState('persisted', { key: 'dude-up' }) : naturalEnhancer
    )
  )
}

export default createAppStore
