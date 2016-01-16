// change back to createBrowserHistory when you want to host on your own server
// import createBrowserHistory from 'history/lib/createBrowserHistory'
import createHashHistory from 'history/lib/createHashHistory'
import { syncReduxAndRouter } from 'redux-simple-router'
import routes from './routes'
import Root from './containers/Root'
import configureStore from './redux/configureStore'
import useScroll from 'scroll-behavior/lib/useStandardScroll'

// const history = createBrowserHistory()
// const history = createHashHistory()
const history = useScroll(createHashHistory)()
const store = configureStore(window.__INITIAL_STATE__)

syncReduxAndRouter(history, store, (state) => state.router)

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
)
