import '../styles/core.scss'
import Navigation from '../containers/Navigation/Navigation.js'
import sty from './CoreLayout.scss'
import Notifications from '../containers/Notification/Notifications.js'

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Statelesss Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of it's props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  return (
    <div className='pageContainer'>
      <Navigation />
      <Notifications />
      <div className={sty.viewContainer}>
        {children}
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: React.PropTypes.element
}

export default CoreLayout
