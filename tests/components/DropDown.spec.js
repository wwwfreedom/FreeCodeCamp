import TestUtils from 'react-addons-test-utils'
import ShallowTestUtils from 'react-shallow-testutils'
// import util from 'util'
import DropDown from 'components/DropDown/DropDown'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaAngleUp from 'react-icons/lib/fa/angle-up'
import sty from 'components/DropDown/DropDown.scss'
import { bindActionCreators } from 'redux'

function shallowRender(component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<DropDown {...props} />)
}

describe('(Component) DropDown', function () {
  let component
  let props
  let spies

  beforeEach(function () {
    spies = {}
    props = {
      dropDownLinks: ['test1', 'test2'],
      dropDownStatus: false,
      ...bindActionCreators({
        dropDownActivate: (spies.dropDownActivate = sinon.spy())
      }, spies.dispatch = sinon.spy())
    }
    component = shallowRenderWithProps(props)
  })

  it('should have a div with class header', () => {
    const actual = ShallowTestUtils.findWithClass(component, sty.header)
    expect(actual).to.exist
  })

  it('div with class header should dispatch an action when click', () => {
    const actual = ShallowTestUtils.findWithClass(component, sty.header)
    spies.dispatch.should.have.not.been.called
    actual.props.onClick(() => {})
    spies.dispatch.should.have.been.called
  })

  it('should have a div with class dropDown with right number of Link component', () => {
    const actual = ShallowTestUtils.findWithClass(component, sty.dropDown).props.children.length
    expect(actual).to.equal(props.dropDownLinks.length)
  })

  it('should dispatch an action dropDownActivate when link is click', () => {
    const actual = ShallowTestUtils.findWithClass(component, sty.dropDown).props.children
    spies.dispatch.should.have.not.been.called
    // simulate click by calling onClick function for each of the link
    actual.forEach((link) => link.props.onClick(() => {}))
  })

  it('should have a FaAngleDown component when dropDownStatus is false', () => {
    const actual = ShallowTestUtils.findWithType(component, FaAngleDown)
    expect(actual).to.exist
  })

  it('should have a FaAngleUp component when dropDownStatus is false', () => {
    let newProps = Object.assign({}, props, {
      dropDownStatus: true
    })
    let newComponent = shallowRenderWithProps(newProps)
    const actual = ShallowTestUtils.findWithType(newComponent, FaAngleUp)
    expect(actual).to.exist
    // console.log(util.inspect(actual))
  })
})