import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import { generalUi } from './modules/generalUi.js'
import { homeView } from './modules/homeView.js'

export default combineReducers({
  generalUi,
  homeView,
  counter,
  router
})
