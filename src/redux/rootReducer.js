import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import { generalUi } from './modules/generalUi.js'
import { homeView } from './modules/homeView.js'
import { aboutView } from './modules/aboutView.js'
import { contactView } from './modules/contactView.js'
import { QuoteView } from './modules/QuoteView.js'
import { PomoTime } from './modules/PomoTime.js'
import { Calculator } from './modules/Calculator/Calculator.js'
import { Weather } from './modules/Weather/Weather.js'
import wikipedia from './modules/Wikipedia/Wikipedia.js'
import Twitch from './modules/Twitch/Twitch.js'
import TicTacToe from './modules/TicTacToe/TicTacToe.js'
import SimonGame from './modules/SimonGame/SimonGame.js'
// import { reducer as notifReducer } from 're-notif'
import notifs from './modules/Notification/reducers/notifs.js'

export default combineReducers({
  generalUi,
  homeView,
  aboutView,
  contactView,
  QuoteView,
  PomoTime,
  Calculator,
  notifs,
  Weather,
  SimonGame,
  TicTacToe,
  Twitch,
  wikipedia,
  counter,
  router
})
