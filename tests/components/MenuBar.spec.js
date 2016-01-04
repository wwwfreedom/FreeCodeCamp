import TestUtils from 'react-addons-test-utils'
import MenuBar from '../../src/components/MenuBar/MenuBar.js'
// import util from 'util'
import ShallowTestUtils from 'react-shallow-testutils'
import sty from '../../src/components/MenuBar/MenuBar.scss'

function shallowRenderer(component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

describe('(Component) MenuBar', function() {
  var renderedMenuBar = shallowRenderer(<MenuBar />)

  it('should have a wrapper div with class container', function() {
    const actual = renderedMenuBar.props.className
    const expected = sty.container
    expect(actual).to.equal(expected)
  })

  it('should have a div with a class brand', function() {
    const actual = ShallowTestUtils.findWithClass(renderedMenuBar, `${sty.brand}`).props.className
    const expected = sty.brand
    expect(actual).to.equal(expected)
  })

  it('should have a nav with class navigation', function() {
    const actual = ShallowTestUtils.findWithClass(renderedMenuBar, `${sty.navigation}`).props.className
    const expected = sty.navigation
    expect(actual).to.equal(expected)
  })

  it('should have a hamburger component with class mobileNavTrigger', function() {
    const actual = ShallowTestUtils.findWithClass(renderedMenuBar, `${sty.mobileNavTrigger}`).props.className
    const expected = sty.mobileNavTrigger
    // console.log(util.inspect(actual))
    expect(actual).to.equal(expected)
  })
})