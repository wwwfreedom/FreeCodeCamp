import TestUtils from 'react-addons-test-utils'
import ShallowTestUtils from 'react-shallow-testutils'
import Contact from 'components/Contact/Contact'
import sty from '../../src/components/Contact/Contact.scss'
import util from 'util'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<Contact {...props} />)
}

describe('(Component) Contact', function () {

  describe('Contact form', function () {

    it('should have a form component', function () {

    })

    it('should have 3 inputs fields for name, email & message', () => {

    })

    it('should have a send button to trigger send action', () => {

    })

    it('should have basic validation for missing required input, invalid emails etc', () => {

    })
  })

  it('should have a google static map showing general based location', () => {

  })

  it('should have a social media section with links passed in via props', () => {

  })
})