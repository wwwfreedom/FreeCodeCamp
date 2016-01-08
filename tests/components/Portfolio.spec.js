import TestUtils from 'react-addons-test-utils'
import ShallowTestUtils from 'react-shallow-testutils'
import Portfolio from 'components/Portfolio/Portfolio'
import sty from '../../src/components/Portfolio/Portfolio.scss'
import util from 'util'
import { Link } from 'react-router'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}, Component) {
  return shallowRender(<Portfolio {...props} />)
}

describe('(Component) Portfolio', function () {
  let component
  let props
  beforeEach(function () {
    props = {
      portfolio: [
        {
          title: 'testTitle',
          link: 'testLink',
          image: 'imagelink',
          introText: 'test Intro text',
          description: "test description"
        }
      ]
    }
    component = shallowRenderWithProps(props)
  })

  it('should render a a div with class container', function () {
    const actual = component.props.className
    const expected = sty.container
    expect(actual).to.equal(expected)
  })

  it('should display portfolio image according to props', function () {
    const actual = ShallowTestUtils.findWithType(component, 'img').props.src
    const expected = props.portfolio[0].image
    // console.log(util.inspect(actual))
    expect(actual).to.equal(expected)
  })

  it('should display portfolio title according to props', function () {
    const actual = ShallowTestUtils.findWithType(component, 'h3').props.children
    const expected = props.portfolio[0].title
    expect(actual).to.equal(expected)
  })

  it('should display portfolio introText according to props', function () {
    const actual = ShallowTestUtils.findWithType(component, 'h4').props.children
    const expected = props.portfolio[0].introText
    expect(actual).to.equal(expected)
  })

  it('should display portfolio description according to props', function () {
    const actual = ShallowTestUtils.findWithType(component, 'p').props.children
    const expected = props.portfolio[0].description
    expect(actual).to.equal(expected)
  })

  it('should display Link component when prop link does not start with http', function () {
    const actual = ShallowTestUtils.findWithType(component, Link).props.to
    const expected = `/${props.portfolio[0].link}`
    expect(actual).to.equal(expected)
  })

  it('should display an anchor tag when prop link starts with http', function () {
    const externalLinkProps = {
      portfolio: [
        Object.assign({}, props.portfolio[0], {
          link: 'http://somewhere.com'
        })
      ]
    }
    const componentWithNewProps = shallowRenderWithProps(externalLinkProps)
    const actual = ShallowTestUtils.findWithType(componentWithNewProps, 'a').props.href
    const expected = externalLinkProps.portfolio[0].link
    expect(actual).to.equal(expected)
  })
})