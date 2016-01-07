import TestUtils from 'react-addons-test-utils'
import ShallowTestUtils from 'react-shallow-testutils'
import Header from 'components/Header/Header'
import sty from 'components/Header/Header.scss'
// import util from 'util'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}, Component) {
  return shallowRender(<Header {...props} />)
}

describe('(Component) Header', function () {
  let component
  let props
  // let rendered
  beforeEach(function () {
    props = {
      headerImage: 'image',
      headerText: 'text',
      headerParagraph: 'paragraph'
    }
    component = shallowRenderWithProps(props)
    // rendered = renderWithProps(props)
  })

  it('should render a a div with class container', function () {
    const actual = component.props.className
    const expected = sty.container
    expect(actual).to.equal(expected)
  })

  it('should display a hero image with the right url from props', function () {
    const actual = ShallowTestUtils.findWithClass(component, sty.bgImage).props.style
    const expected = {backgroundImage: `url('${props.headerImage}')`}
    expect(actual).to.deep.equal(expected)
  })

  it('should display header text according to props', function () {
    const actual = ShallowTestUtils.findWithType(component, 'h1').props.children
    const expected = props.headerText
    expect(actual).to.equal(expected)
  })

  it('should display right header paragraph', function () {
    const actual = ShallowTestUtils.findWithType(component, 'p').props.children
    const expected = props.headerParagraph
    expect(actual).to.equal(expected)
    // console.log(util.inspect(actual))
  })
  // it('should trigger animation base on scroll')
})