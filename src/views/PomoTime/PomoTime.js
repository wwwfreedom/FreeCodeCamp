import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as PomoTimeActions } from 'redux/modules/PomoTime.js'
import sty from './PomoTime.scss'
import Title from 'components/PomoTime/Title/Title'
import Timer from 'components/PomoTime/Timer/Timer'

const mapStateToProps = (state) => ({
  pomoTime: state.PomoTime,
  timer: state.PomoTime.timer,
  work: state.PomoTime.work,
  rest: state.PomoTime.rest
})

export class PomoTime extends Component {
  static propTypes = {
    pomoTime: PropTypes.object,
    timer: PropTypes.object,
    work: PropTypes.object,
    rest: PropTypes.object,
    countDownStart: PropTypes.func.isRequired,
    countDownPause: PropTypes.func.isRequired,
    countDownReset: PropTypes.func.isRequired,
    workTimeIncrease: PropTypes.func.isRequired,
    restTimeIncrease: PropTypes.func.isRequired,
    distractionTimeIncrease: PropTypes.func.isRequired,
    timerProgressSet: PropTypes.func.isRequired,
    settingOpen: PropTypes.func.isRequired,
    settingClose: PropTypes.func.isRequired,
    timerTypeSet: PropTypes.func.isRequired,
    settingToggle: PropTypes.func.isRequired,
    statDistractionSet: PropTypes.func.isRequired,
    statWorkCompleteSet: PropTypes.func.isRequired,
    statRestCompleteSet: PropTypes.func.isRequired
  }

  render() {
    const { timer } = this.props
    return (
      <div className={sty.container}>
        <Title timer={timer.currentType}/>
        <Timer
          {...this.props}
         />
      </div>
    )
  }
}

export default connect(mapStateToProps, PomoTimeActions)(PomoTime)