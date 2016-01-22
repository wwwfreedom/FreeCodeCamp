import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as PomoTimeActions } from 'redux/modules/PomoTime.js'
import sty from './PomoTime.scss'
import Title from 'components/PomoTime/Title/Title'
import Timer from 'components/PomoTime/Timer/Timer'
import InfoPanel from 'components/PomoTime/InfoPanel/InfoPanel'
import SettingsPanel from 'components/PomoTime/SettingsPanel/SettingsPanel'

const mapStateToProps = (state) => ({
  settings: state.PomoTime.settings,
  stats: state.PomoTime.stats,
  timer: state.PomoTime.timer,
  work: state.PomoTime.work,
  rest: state.PomoTime.rest,
  goals: state.PomoTime.goals
})

export class PomoTime extends Component {
  static propTypes = {
    timer: PropTypes.object.isRequired,
    work: PropTypes.object.isRequired,
    rest: PropTypes.object.isRequired,
    stats: PropTypes.object.isRequired,
    goals: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
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
    statRestCompleteSet: PropTypes.func.isRequired,
    timerDurationChange: PropTypes.func.isRequired,
    goalChange: PropTypes.func.isRequired
  }

  render() {
    const { timer, settings, stats, goals } = this.props
    return (
      <div className={sty.container}>
        <Title timer={timer.currentType}/>
        <Timer
          {...this.props}
        />
        {settings.toggleStatus === false
          ? <InfoPanel
              timer={timer}
              stats={stats}
              goals={goals}
            />
          : <SettingsPanel
              {...this.props}
            />}
      </div>
    )
  }
}

export default connect(mapStateToProps, PomoTimeActions)(PomoTime)