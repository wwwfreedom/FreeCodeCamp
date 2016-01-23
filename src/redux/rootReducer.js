import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import { generalUi } from './modules/generalUi.js'
import { homeView } from './modules/homeView.js'
import { aboutView } from './modules/aboutView.js'
import { contactView } from './modules/contactView.js'
import { QuoteView } from './modules/QuoteView.js'
import { PomoTime } from './modules/PomoTime.js'

export default combineReducers({
  generalUi,
  homeView,
  aboutView,
  contactView,
  QuoteView,
  PomoTime,
  counter,
  router
})
