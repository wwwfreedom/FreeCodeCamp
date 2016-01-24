import { shallow } from 'enzyme'
// import util from 'util'

// note when testing component that is wrap in redux react connect() use import bracket to access the component
import { Calculator } from 'views/Calculator/Calculator.js'
import sty from 'views/Calculator/Calculator.scss'

describe('(View) Calculator ', () => {
  let props
  let wrapper

  beforeEach(function () {
    props = {
      number: 0
    }
    wrapper = shallow(<Calculator {...props}/>)
  })

  it('Should render as a div with class container', () => {
    expect(wrapper.find(`.${sty.container}`)).to.have.length(1)
  })
})