import React, { PropTypes } from 'react'
import FaPlus from 'react-icons/lib/fa/plus'
import FaMinus from 'react-icons/lib/fa/minus'
import sty from './SettingsPanel.scss'
import 'react-ios-switch/index.css'
import Switch from 'react-ios-switch'

export default function SettingsPanel ({timer, timerDurationChange, work, rest, goalChange, goals, settingAutoBreakToggle, settingAlarmNotificationToggle, settingAlarmAudioToggle, settings}) {
  return (
    <div className={sty.container}>
      <div className={sty.rowWrap}>
        <div className={sty.setting}>
          <div className={sty.header}> <h4>Work</h4> </div>
          <div className={sty.content}>
            <span
              className={sty.buttonWrap}
              onClick={() => timerDurationChange('work', 'decrease', 1)}
            >
              <FaMinus />
            </span>
            <span className={sty.number}><p>{work.durationInMinute}</p></span>
            <span
              className={sty.buttonWrap}
              onClick={() => timerDurationChange('work', 'increase', 1)}
            >
              <FaPlus />
            </span>
          </div>
        </div>
        <div className={sty.setting}>
          <div className={sty.header}> <h4>Break</h4> </div>
          <div className={sty.content}>
            <span
              className={sty.buttonWrap}
              onClick={() => timerDurationChange('rest', 'decrease', 1)}
            >
              <FaMinus />
            </span>
            <span className={sty.number}>{rest.durationInMinute}</span>
            <span
              className={sty.buttonWrap}
              onClick={() => timerDurationChange('rest', 'increase', 1)}
            >
              <FaPlus />
            </span>
          </div>
        </div>
      </div>
      <div className={sty.rowWrap}>
        <div className={sty.setting}>
          <div className={sty.header}> <h4>Daily Goal</h4> </div>
          <div className={sty.content}>
            <span
              className={sty.buttonWrap}
              onClick={() => goalChange('dailyGoal', 'decrease', 1)}
            >
              <FaMinus />
            </span>
            <span className={sty.number}>{goals.daily}</span>
            <span
              className={sty.buttonWrap}
              onClick={() => goalChange('dailyGoal', 'increase', 1)}
            >
              <FaPlus />
            </span>
          </div>
        </div>
          <div className={sty.miscContent}>
            <div className={sty.switch}>
              <Switch
                className={sty.switchButton}
                checked={settings.autoBreak}
                onChange={settingAutoBreakToggle}
                uncheckedColor={'#9b2010'}
              />
              <span>Auto Start</span>
            </div>
            <div className={sty.switch}>
              <Switch
                className={sty.switchButton}
                checked={settings.alarmMute}
                onChange={settingAlarmAudioToggle}
                uncheckedColor={'#9b2010'}
              />
              <span>Mute</span>
            </div>
            <div className={sty.switch}>
              <Switch
                className={sty.switchButton}
                checked={settings.alarmNotify}
                onChange={settingAlarmNotificationToggle}
                uncheckedColor={'#9b2010'}
              />
              <span>Notification</span>
            </div>
          </div>
      </div>
    </div>
  )
}

SettingsPanel.propTypes = {
  timer: PropTypes.object.isRequired
}
