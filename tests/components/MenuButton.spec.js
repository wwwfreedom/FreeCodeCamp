import TestUtils from 'react-addons-test-utils'
import MenuButton from '../../src/components/MenuButton/MenuButton.js'
// a node module that Returns a string representation of object, which is useful for debugging.
// import util from 'util'
import ShallowTestUtils from 'react-shallow-testutils'

function shallowRenderer(component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

describe('(Component) MenuButton', () => {
  var button

  beforeEach(function() {
    button = shallowRenderer(<MenuButton />)
  })

  it('should contain 3 span elements', () => {
    const actual = ShallowTestUtils.findAllWithType(button, 'span').length
    const expected = 3
    expect(actual).to.equal(expected)
    expect()
  })
})

// util.inspect