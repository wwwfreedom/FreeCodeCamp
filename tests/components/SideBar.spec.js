import TestUtils from 'react-addons-test-utils'
import SideBar from '../../src/components/SideBar/SideBar.js'
import util from 'util'
import ShallowTestUtils from 'react-shallow-testutils'
import sty from '../../src/components/SideBar/SideBar.scss'

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
  var rendered
  var props

  beforeEach(function() {
    props = {
      mobileNavIsOpen: true,
      toggleMenu: sinon.spy()
    }
    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)
  })

  it('should have a wrapper div with no class when sideBar is not active ', function() {
    const actual = shallowRenderWithProps({mobileNavIsOpen: false}).props.className
    const expected = ''
    expect(actual).to.equal(expected)
  })

  it('should have a wrapper div with class mobileNavOpen when sideBar is active', function() {
    const actual = shallowRenderWithProps({mobileNavIsOpen: true}).props.className
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
      shallowRenderWithProps({mobileNavIsOpen: false}), `${sty.menuClose}`
    ).props.className
    const expected = sty.menuClose

    expect(actual).to.equal(expected)
  })

  it('should have a div with class menuOpen when sideBar is active', function() {
    const actual = ShallowTestUtils.findWithClass(
      component, `${sty.menuOpen}`
    ).props.className
    const expected = sty.menuOpen

    expect(actual).to.equal(expected)
  })

  it('should have a nav element', function() {
    const actualType = ShallowTestUtils.findWithType(component, 'nav').type
    const expectedType = 'nav'

    expect(actualType).to.equal(expectedType)
  })

  it('should have a wrapper div with no class when user click outside the menu area', function() {
    // var view = safeRender(<SideBar mobileNavIsOpen={true} />)
    // var check = TestUtils.scryRenderedDOMComponentsWithClass(view, sty.mobileNavOffTrigger)
    // TestUtils.Simulate.click[check[0]]
    // var wrapper = ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithClass(view, 'test'))
    // // TestUtils.Simulate.click[check[0]]
    // // var wrapper1 = ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithClass(view, 'test'))
    // // const actual = TestUtils.findRenderedDOMComponentWithClass(rendered, `${sty.mobileNavOffTrigger}`)
    // // const actualDom =() => React.findDOMNode(actual)
    // // TestUtils.Simulate.click(actualDom)
    // // const expected =
  })

  it('should have a wrapper div with no class when user click on any link')

  it('should have a wrapper div with no class when user press esc key')
})