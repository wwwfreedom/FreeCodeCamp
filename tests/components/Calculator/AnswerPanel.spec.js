import { shallow } from 'enzyme'
// import util from 'util'
import AnswerPanel from 'components/Calculator/AnswerPanel/AnswerPanel'
import sty from 'components/Calculator/AnswerPanel/AnswerPanel.scss'

describe('(Component) Calculator AnswerPanel', () => {
  let props
  let wrapper

  beforeEach(function () {
    props = {
      answer: 'test'
    }
    wrapper = shallow(<AnswerPanel {...props}/>)
  })

  it('Should render as a div with class container', () => {
    expect(wrapper.find(`.${sty.container}`)).to.have.length(1)
  })

  it('Should have a span with the right value', () => {
    expect(wrapper.find('span').text()).to.eql('test')
  })
})