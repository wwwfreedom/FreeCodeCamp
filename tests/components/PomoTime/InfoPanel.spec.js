import { shallow } from 'enzyme'
import InfoPanel from 'components/PomoTime/InfoPanel/InfoPanel'
import PieProgress from 'components/PomoTime/PieProgress/PieProgress'
import sty from 'components/PomoTime/InfoPanel/InfoPanel.scss'

describe('(Component) InfoPanel', () => {
  let props
  let wrapper

  beforeEach(function () {
    props = {
      timer: {
        status: 'notActive',
        currentType: 'work',
        progress: 0.5,
        alarmSoundPlayingStatus: false
      },
      stats: {
        restCompleted: 1,
        workCompleted: 1,
        distractionOccurence: 1
      },
      goals: {
        daily: 10
      }
    }
    wrapper = shallow(<InfoPanel {...props}/>)
  })

  it('Should render as a div with class container', () => {
    expect(wrapper.find(`.${sty.container}`)).to.have.length(1)
  })

  it('should have two divs with class setting ', () => {
    expect(wrapper.find(`.${sty.setting}`)).to.have.length(2)
  })

  it('should have two h4, 1st is Round, 2nd is Goal ', () => {
    expect(wrapper.find('h4')).to.have.length(2)
    expect(wrapper.find('h4').at(0).text()).to.eql('Round')
    expect(wrapper.find('h4').at(1).text()).to.eql('Goal')
  })

  it('should have 4 span with the right content according to props ', () => {
    let actualSpanArr = wrapper.find('span')
    expect(actualSpanArr).to.have.length(4)
    expect(actualSpanArr.at(0).text()).to.eql('1')
    expect(actualSpanArr.at(1).text()).to.eql('/4')
    expect(actualSpanArr.at(2).text()).to.eql(`${props.stats.workCompleted}`)
    expect(actualSpanArr.at(3).text()).to.eql(`/${props.goals.daily}`)
  })

  it('should have two PieProgress component', () => {
    expect(wrapper.find(PieProgress)).to.have.length(2)
  })
})