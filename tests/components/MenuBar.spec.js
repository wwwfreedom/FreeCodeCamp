import TestUtils from 'react-addons-test-utils'
import MenuBar from '../../src/components/MenuBar/MenuBar.js'
// import util from 'util'
import ShallowTestUtils from 'react-shallow-testutils'
import sty from '../../src/components/MenuBar/MenuBar.scss'
import { menuLinks } from '../../src/redux/modules/generalUi.js'
import { bindActionCreators } from 'redux'
import DropDown from 'components/DropDown/DropDown'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

// function renderWithProps (props = {}) {
//   return TestUtils.renderIntoDocument(<MenuBar {...props} />)
// }

function shallowRenderWithProps (props = {}) {
  return shallowRender(<MenuBar {...props} />)
}

describe('(Component) MenuBar', function() {
  var component
  // let rendered
  let props
  let spies

  beforeEach(function () {
    spies = {}
    props = {
      mobileNavIsOpen: false,
      menuLinks: menuLinks,
      dropDownLinks: ['test1', 'test2'],
      dropDownStatus: false,
      ...bindActionCreators({
        toggleMenu: (spies.toggleMenu = sinon.spy()),
        dropDownActivate: (spies.dropDownActivate = sinon.spy())
      }, spies.dispatch = sinon.spy())
    }
    component = shallowRenderWithProps(props)
    // rendered = renderWithProps(props)
  })

  it('should render as a div with class container', function() {
    const actual = component.props.className
    const expected = sty.container
    expect(actual).to.equal(expected)
  })

  it('should have a div with a class brand', function() {
    const actual = ShallowTestUtils.findWithClass(component, `${sty.brand}`)
    const expected = sty.brand
    expect(actual.props.className).to.equal(expected)
  })

  it('should have a nav with class navigation with as many links as the menuLinks props', function() {
    const actual = ShallowTestUtils.findWithClass(component, `${sty.navigation}`).props
    const expected = sty.navigation
    expect(actual.className).to.equal(expected)
    expect(actual.children.length).to.equal(props.menuLinks.length)
  })

  it('should have a dropdown component with as many link as the dropDownLinks props', function () {
    const actual = ShallowTestUtils.findWithType(component, DropDown).props.dropDownLinks
    const expected = props.dropDownLinks
    expect(actual).to.equal(expected)
    // console.log(util.inspect(actual))
  })

  it('should have a hamburger component with class mobileNavTrigger', function() {
    const actual = ShallowTestUtils.findWithClass(component, `${sty.mobileNavTrigger}`)
    const expected = sty.mobileNavTrigger
    expect(actual.props.className).to.equal(expected)
  })
})