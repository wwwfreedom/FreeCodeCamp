import { bindActionCreators } from 'redux'
import { shallow } from 'enzyme'
// import util from 'util'
// note when testing component that is wrap in redux react connect() use import bracket to access the component
import { QuoteView } from 'views/QuoteView/QuoteView.js'
import sty from 'views/QuoteView/QuoteView.scss'

describe('(View) QuoteView', function () {
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
    wrapper = shallow(<QuoteView {...props}/>)
  })

  it('Should render as a div with class container', () => {
    expect(wrapper.find(`.${sty.container}`)).to.have.length(1)
  })

  it('should have two links ', () => {
    expect(wrapper.find('a')).to.have.length(2)
  })

  it('should fire a redux action when the more quote link is click', () => {
    let link = wrapper.find('a').first()
    spies.dispatch.should.have.not.been.called
    expect(link.text()).to.eql('More quotes')
    link.simulate('click')
    spies.dispatch.should.have.been.called
  })

  it('should render a paragraph with text pass in via props', () => {
    expect(wrapper.find('p').first().text()).to.eql(`"${props.quote.text}"`)
  })

  it('should render a paragraph with autor pass in via props', () => {
    expect(wrapper.find('p').last().text()).to.eql(`-${props.quote.author}.`)
  })

  it('should render an image with source pass in via props', () => {
    let img = wrapper.find('img').prop('src')
    expect(img).to.eql(props.quote['image-src'])
  })

  it('should render a filler div when image source is not available', () => {
    let propsWithNoImageLinks = Object.assign({}, props, {
      quote: {
        ...props.quote,
        'image-src': 'xphoto-unavailable'
      }
    })

    let newWrapper = shallow(<QuoteView {...propsWithNoImageLinks}/>)
    // confirm existency of fillerDiv
    expect(newWrapper.find(`.${sty.fillerDiv}`)).to.have.length(1)
    // make sure no img is rendered
    expect(newWrapper.find('img')).to.have.length(0)
  })
})