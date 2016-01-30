import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import createLogger from 'redux-logger'
import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'

const logger = createLogger()

export default function configureStore (initialState) {
  let createStoreWithMiddleware
  const middleware = applyMiddleware(thunk, logger)

  // turning this devtool off when using browsersync for multiple devices css style development. turn back on when you need to play around redux state
  if (__DEBUG__) {
    createStoreWithMiddleware = compose(
      middleware,
      window.devToolsExtension
        ? window.devToolsExtension()
        : require('containers/DevTools').default.instrument()
    )
  } else {
    createStoreWithMiddleware = compose(middleware)
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  )
  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
