import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as PomoTimeActions } from 'redux/modules/PomoTime.js'
import sty from './PomoTime.scss'
import Title from 'components/PomoTime/Title/Title'
import Timer from 'components/PomoTime/Timer/Timer'
import InfoPanel from 'components/PomoTime/InfoPanel/InfoPanel'
import SettingsPanel from 'components/PomoTime/SettingsPanel/SettingsPanel'
import AudioPlayer from 'components/PomoTime/AudioPlayer/AudioPlayer'

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
    rest: PropTypes.object.isRequired,
    stats: PropTypes.object.isRequired,
    goals: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    alarmSoundPlayOff: PropTypes.func.isRequired
  };

  render() {
    const { timer, settings, stats, goals, alarmSoundPlayOff } = this.props
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
            />
        }
        <AudioPlayer
          source={settings.alarmSoundSource}
          isPlaying={timer.alarmSoundPlayingStatus}
          onEnd={alarmSoundPlayOff}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, PomoTimeActions)(PomoTime)