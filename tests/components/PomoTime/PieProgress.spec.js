import { shallow } from 'enzyme'
import PieProgress from 'components/PomoTime/PieProgress/PieProgress'
import sty from 'components/PomoTime/PieProgress/PieProgress.scss'

describe('(Component) PieProgress', () => {
  let props
  let wrapper

  beforeEach(function () {
    props = {
      diameter: 10,
      strokeWidth: 5,
      progress: 0.5
    }
    wrapper = shallow(<PieProgress {...props}/>)
  })

  it('Should render as a div with class radialProgress', () => {
    expect(wrapper.find(`.${sty.radialProgress}`)).to.have.length(1)
  })

  it('should render one svg', () => {
    expect(wrapper.find('svg')).to.have.length(1)
  })

  it('should render two circles element', () => {
    expect(wrapper.find('circle')).to.have.length(2)
  })

  it('should have strokewidth property equal to prop circles element', () => {
    expect(wrapper.find('circle').at(0).prop('strokeWidth')).to.eql(props.strokeWidth)
  })

  it('should have diameter property equal to prop svg element', () => {
    expect(wrapper.find('svg').prop('width')).to.eql(props.diameter)
  })
})