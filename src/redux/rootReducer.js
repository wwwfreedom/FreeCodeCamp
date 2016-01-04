import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import sideBarStatus from './modules/generalUi.js'

export default combineReducers({
  sideBarStatus,
  counter,
  router
})
