import TestUtils from 'react-addons-test-utils'
import SideBar from '../../src/components/SideBar/SideBar.js'
// import util from 'util'
import ShallowTestUtils from 'react-shallow-testutils'
import sty from '../../src/components/SideBar/SideBar.scss'
import { bindActionCreators } from 'redux'
import { menuLinks } from '../../src/redux/modules/generalUi.js'
import DropDown from 'components/DropDown/DropDown'

function shallowRender(component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function renderWithProps(props = {}) {
  return TestUtils.renderIntoDocument(<SideBar {...props} />)
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<SideBar {...props} />)
}

describe('(Component) SideBar', function() {
  var component
  let rendered
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
    rendered = renderWithProps(props)
  })

  it('should have a wrapper div with no class when sideBar is not active ', function() {
    const actual = component.props.className
    const expected = ''
    expect(actual).to.equal(expected)
  })

  it('should have a wrapper div with class mobileNavOpen when sideBar is active', function() {
    const actual = shallowRenderWithProps(Object.assign({}, props, {
      mobileNavIsOpen: true
    })).props.className
    const expected = sty.mobileNavOpen
    expect(actual).to.equal(expected)
  })

  it('should have a div with class mobileNavOffTrigger', function() {
    const actual = ShallowTestUtils.findWithClass(component, `${sty.mobileNavOffTrigger}`).props.className
    const expected = sty.mobileNavOffTrigger

    expect(actual).to.equal(expected)
  })

  it('should have a div with class menuClose when sideBar is not active', function() {
    const actual = ShallowTestUtils.findWithClass(
      component, `${sty.menuClose}`
    ).props.className
    const expected = sty.menuClose

    expect(actual).to.equal(expected)
  })

  it('should have a div with class menuOpen when sideBar is active', function() {
    const actual = ShallowTestUtils.findWithClass(
      shallowRenderWithProps(Object.assign({}, props, {
        mobileNavIsOpen: true
      })), `${sty.menuOpen}`
    ).props.className
    const expected = sty.menuOpen

    expect(actual).to.equal(expected)
  })

  it('should have a nav element', function() {
    const actualType = ShallowTestUtils.findWithType(component, 'nav').type
    const expectedType = 'nav'

    expect(actualType).to.equal(expectedType)
  })

  it('should have a dropdown component with as many link as the dropDownLinks props', function () {
    const actual = ShallowTestUtils.findWithType(component, DropDown).props.dropDownLinks
    const expected = props.dropDownLinks
    expect(actual).to.equal(expected)
    // console.log(util.inspect(actual))
  })

  it('div with class mobileNavOffTrigger should dispatch a sidebarActivate action when clicked', function() {
    const actual = TestUtils.findRenderedDOMComponentWithClass(rendered, sty.mobileNavOffTrigger)

    expect(actual).to.exist
    spies.dispatch.should.have.not.been.called
    TestUtils.Simulate.click(actual)
    spies.dispatch.should.have.been.called
  })

  it('should dispatch a sidebarActivate action when user click on any links', function () {
    const actual = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'a')
    spies.dispatch.should.have.not.been.called
    actual.forEach((link) => {
      TestUtils.Simulate.click(link)
      spies.dispatch.should.have.been.called
    })
  })
  // I don't know how to target window so just targeting componnent level for now
  // it('should dispatch a sidebarActivate action when user press esc key', function () {
  //   // spies.dispatch.should.have.not.been.called
  //   // const dom = renderWithProps(Object.assign({}, props, {
  //   //   mobileNavIsOpen: true
  //   // }))
  //   // const actual = TestUtils.findRenderedDOMComponentWithClass(dom, sty.mobileNavOpen)
  //   // console.log(util.inspect())
  //   // TestUtils.Simulate.keyDown(dom, { keycode: 27 })
  //   // spies.dispatch.should.have.been.called
  // })
})