import TestUtils from 'react-addons-test-utils'
import MenuButton from '../../src/components/MenuButton/MenuButton.js'
import sty from '../../src/components/MenuButton/MenuButton.scss'
// a node module that Returns a string representation of object, which is useful for debugging.
// import util from 'util'
import ShallowTestUtils from 'react-shallow-testutils'
import { bindActionCreators } from 'redux'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()
  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<MenuButton {...props} />)
}

describe('(Component) MenuButton', () => {
  var component
  let props
  let spies

  beforeEach(function () {
    spies = {}
    props = {
      navStatus: false,
      ...bindActionCreators({
        onClick: (spies.onClick = sinon.spy())
      }, spies.dispatch = sinon.spy())
    }
    component = shallowRenderWithProps(props)
  })

  it('should contain 3 span elements', () => {
    const actual = ShallowTestUtils.findAllWithType(component, 'span').length
    const expected = 3
    expect(actual).to.equal(expected)
  })

  it('div with class clickRegion should dispatch an action when clicked', function () {
    spies.dispatch.should.have.not.been.called
    const actual = ShallowTestUtils.findWithClass(component, sty.clickRegion)
    // similating a click with stateless component
    actual.props.onClick(() => {})
    spies.dispatch.should.have.been.called
  })
})

// util.inspect