import { bindActionCreators } from 'redux'
import { shallow } from 'enzyme'
// import util from 'util'

// note when testing component that is wrap in redux react connect() use import bracket to access the component
import { Calculator } from 'views/Calculator/Calculator.js'
import Button from 'components/Calculator/Button/Button'
import AnswerPanel from 'components/Calculator/AnswerPanel/AnswerPanel'
import sty from 'views/Calculator/Calculator.scss'

describe('(View) Calculator ', () => {
  let props
  let spies
  let wrapper

  beforeEach(function () {
    spies = {}
    props = {
      output: '0',
      ...bindActionCreators({
        calcButtonClick: (spies.calcButtonClick = sinon.spy()),
        calcDotButtonClick: (spies.calcDotButtonClick = sinon.spy()),
        calcReset: (spies.calcReset = sinon.spy()),
        calcAdd: (spies.calcAdd = sinon.spy()),
        calcEqual: (spies.calcEqual = sinon.spy()),
        calcMinus: (spies.calcMinus = sinon.spy()),
        calcMultiply: (spies.calcMultiply = sinon.spy()),
        calcDivide: (spies.calcDivide = sinon.spy())
      }, spies.dispatch = sinon.spy())
    }
    wrapper = shallow(<Calculator {...props}/>)
  })

  it('Should render as a div with class container', () => {
    expect(wrapper.find(`.${sty.container}`)).to.have.length(1)
  })

  it('should have rendered one AnswerPanel component', () => {
    expect(wrapper.find(AnswerPanel)).to.have.length(1)
  })

  it('should have rendered twenty Button component', () => {
    expect(wrapper.find(Button)).to.have.length(20)
  })

  it('should have rendered six div with class rowWrap', () => {
    expect(wrapper.find(`.${sty.rowWrap}`)).to.have.length(6)
  })

  it('should dispatch an action when a button is clicked', () => {
    spies.dispatch.should.have.not.been.called
    wrapper.find(Button).forEach((button) => {
      button.simulate('click')
      spies.dispatch.should.have.been.called
    })
  })
})