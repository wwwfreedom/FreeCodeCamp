import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import { generalUi } from './modules/generalUi.js'

export default combineReducers({
  generalUi,
  counter,
  router
})
