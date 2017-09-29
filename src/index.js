import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import reducer from './reducers'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import persistState from 'redux-localstorage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

import { loadListsSummary } from './lists/actions'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
    persistState('entities', {  key: 'dude-up' })
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

sagaMiddleware.run(rootSaga)

store.dispatch(loadListsSummary())
