import TestUtils from 'react-addons-test-utils'
import ShallowTestUtils from 'react-shallow-testutils'
import Section from 'components/Section/Section'
import sty from 'components/Section/Section.scss'
// import util from 'util'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}, Component) {
  return shallowRender(<Section {...props} />)
}

describe('(Component) Section', function () {
  let component
  let props
  beforeEach(function () {
    props = {
      text: 'text',
      title: 'title'
    }
    component = shallowRenderWithProps(props)
  })

  it('should render a a div with class container', function () {
    const actual = component.props.className
    const expected = sty.container
    expect(actual).to.equal(expected)
  })

  it('should display section title according to props', function () {
    const actual = ShallowTestUtils.findWithType(component, 'h2').props.children
    const expected = props.title
    expect(actual).to.equal(expected)
  })

  it('should display section text according to prop', function () {
    const actual = ShallowTestUtils.findWithType(component, 'p').props.children
    const expected = props.text
    expect(actual).to.equal(expected)
    // console.log(util.inspect(actual))
  })
})