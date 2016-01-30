import { shallow } from 'enzyme'
// import util from 'util'
import Button from 'components/Calculator/Button/Button'
import sty from 'components/Calculator/Button/Button.scss'

describe('(Component) Calculator Button', () => {
  let props
  let wrapper

  beforeEach(function () {
    props = {
      value: 1,
      background: 'red'
    }
    wrapper = shallow(<Button {...props}/>)
  })

  it('Should render as a div with class container', () => {
    expect(wrapper.find(`.${sty.container}`)).to.have.length(1)
  })

  it('Should have a style prop with correct value', () => {
    expect(wrapper.find('input').props().style).to.eql({background: 'red'})
  })

  it('Should have a span with the right value', () => {
    // console.log(util.inspect(wrapper.find('input')))
    expect(wrapper.find('input').prop('value')).to.eql(1)
  })
})