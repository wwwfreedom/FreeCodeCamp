import '../styles/core.scss'
import Navigation from '../containers/Navigation/Navigation.js'
import Footer from 'components/Footer/Footer'
import sty from './CoreLayout.scss'
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
      <div className={sty.viewContainer}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

CoreLayout.propTypes = {
  children: React.PropTypes.element
}

export default CoreLayout
