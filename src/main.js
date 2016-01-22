// this is an overide to the setInterval method to stop chrome from slowing down the call to interval when the user navigate to another tab. the script basically use webworkers api to run the setInterval from my brief look at the source
//
// change back to createBrowserHistory when you want to host on your own server
// import createBrowserHistory from 'history/lib/createBrowserHistory'
// import createHashHistory from 'history/lib/createHashHistory'
import { createHashHistory, useBasename } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'
import routes from './routes'
import Root from './containers/Root'
import configureStore from './redux/configureStore'

// refer here for the source https://github.com/turuslan/HackTimer
import 'hacktimer'
// import useScroll from 'scroll-behavior/lib/useStandardScroll'

// const history = createBrowserHistory()
// const history = createHashHistory()

const history = useBasename(createHashHistory)({
  basename: __BASENAME__
})
// const history = useScroll(createHashHistory)()
const store = configureStore(window.__INITIAL_STATE__)

syncReduxAndRouter(history, store, (state) => state.router)

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
)
