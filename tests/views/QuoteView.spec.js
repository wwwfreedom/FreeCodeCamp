import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
import ShallowTestUtils from 'react-shallow-testutils'
import { shallow } from 'enzyme'
import util from 'util'
// note when testing component that is wrap in redux react connect() use import bracket to access the component
import { QuoteView } from 'views/QuoteView/QuoteView.js'
import sty from 'views/QuoteView/QuoteView.scss'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<QuoteView {...props} />)
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<QuoteView {...props} />)
}

describe('(View) QuoteView', function () {
  let component
  let rendered
  let props
  let spies
  let wrapper

  beforeEach(function () {
    spies = {}
    props = {
      quote: {
        "author": "testAuthor",
        "text": "testText",
        "image-src": "testImage"
      },
      ...bindActionCreators({
        quoteGetNoDupes: (spies.quoteGetNoDupes = sinon.spy())
      }, spies.dispatch = sinon.spy())
    }

    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)
    wrapper = shallow(<QuoteView {...props}/>)
  })

  it('Should render as a div with class container', () => {
    expect(component.props.className).to.eql(sty.container)
  })

  it('should have a more quote link that fire an redux action when clicked', () => {
    // let link = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'a')
    console.log(util.inspect(wrapper))
  })
})