import React, { Component, PropTypes } from 'react'
import sty from './Timer.scss'
import TimeDisplay from 'components/PomoTime/TimeDisplay/TimeDisplay'
import moment from 'moment'
import MdPause from 'react-icons/lib/md/pause'
import MdClose from 'react-icons/lib/md/close'
import MdSettings from 'react-icons/lib/md/settings'
import MdPlayArrow from 'react-icons/lib/md/play-arrow'
import img from '../../../static/images/ion-ios-timer-outline_96_0_ffffff_fe4730.png'

function minToMs (min) {
  return moment.duration(min, 'minutes').asMilliseconds()
}

export default class Timer extends Component {
  static propTypes = {
    timer: PropTypes.object.isRequired,
    work: PropTypes.object.isRequired,
    rest: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    countDownStart: PropTypes.func.isRequired,
    countDownPause: PropTypes.func.isRequired,
    countDownReset: PropTypes.func.isRequired,
    settingClose: PropTypes.func.isRequired,
    settingToggle: PropTypes.func.isRequired,
    timerProgressSet: PropTypes.func.isRequired,
    workTimeIncrease: PropTypes.func.isRequired,
    restTimeIncrease: PropTypes.func.isRequired,
    distractionTimeIncrease: PropTypes.func.isRequired,
    timerTypeSet: PropTypes.func.isRequired,
    statDistractionSet: PropTypes.func.isRequired,
    statWorkCompleteSet: PropTypes.func.isRequired,
    statRestCompleteSet: PropTypes.func.isRequired,
    alarmSoundPlayOn: PropTypes.func.isRequired
  };

  state = {
    windowWidth: window.innerWidth
  };

  render() {
    const { timer } = this.props
    let diameter = this.dynamicDiameter()
    let strokeWidth = 8
    let radius = (diameter - (2 * strokeWidth)) / 2
    let circumference = 2 * Math.PI * radius
    let offset = (1 - timer.progress) * circumference
    let cx = diameter / 2
    let cy = diameter / 2
    let style = {
      // the styling that draws the offset in the svg
      strokeDashoffset: offset,
      transform: 'rotate(0.1deg)' // to fix Firefox
    }
    // because moment.duration(60) returns 0 which cause a initial display on screen of 00:00 then 59:59 we will forcely set the minutes to 60 to prevent the above effect from happenning.
    let minutes = this.state.duration.asMilliseconds() === 3600000 ? 60 : this.state.duration.minutes()
    return (
    <div className={sty.container}>
      <div className={sty.radialProgress}>
        <div className={sty.time}>
          <TimeDisplay
            minute={minutes}
            second={this.state.duration.seconds()}
          />
        </div>
        {this.renderSettingButton()}
        {this.renderButtons()}
        <svg width={diameter} height={diameter} style={{transform: 'rotate(270deg)'}} >
            <circle
              className={sty.radialProgressBackGround}
              cx={cx}
              cy={cy}
              r={radius}
              fill='transparent'
              strokeWidth={strokeWidth}
            />
            <circle
              className={sty.radialProgressBar}
              cx={cx}
              cy={cy}
              r={radius}
              fill='transparent'
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              style={style}
            />
          </svg>
      </div>
    </div>
    )
  }

  componentWillMount() {
    // set the duration to the state accoring to the current timer active and the default length of their corresponding length.
    const { timer, work, rest } = this.props
    this.setState(function(previousState, currentProps) {
      if (timer.currentType === 'work') {
        return {
          duration: moment.duration(minToMs(work.durationInMinute), 'ms')
        }
      } else {
        return {
          duration: moment.duration(minToMs(rest.durationInMinute), 'ms')
        }
      }
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  // add in logic to detect resize to adjust the svg diameter to suit the viewport
  handleResize = (e) => {
    this.setState({windowWidth: window.innerWidth})
  };

  renderSettingButton = () => {
    const { timer, settingToggle } = this.props
    if (timer.status === 'active' || timer.status === 'pause') {
      return (
        <div className={sty.iconSettings}>
          <MdClose onClick={this.handleReset}/>
        </div>
      )
    } else {
      return (
        <div className={sty.iconSettings}>
          <MdSettings onClick={settingToggle}/>
        </div>
      )
    }
  };

  renderButtons = () => {
    const { timer } = this.props
    if (timer.status === 'notActive' || timer.status === 'pause') {
      return (
        <div className={sty.icons}>
          <MdPlayArrow onClick={this.handleStart}/>
        </div>
      )
    } else {
      return (
        <div className={sty.icons}>
          <MdPause onClick={this.handlePause}/>
        </div>
      )
    }
  };

  // adjust the svg circle cicumference for small and big viewport
  dynamicDiameter = () => {
    if (this.state.windowWidth <= 568) {
      return 270
    } else {
      return 360
    }
  };

  handleReset = () => {
    const { timer, countDownReset, work, rest, timerProgressSet } = this.props
    // resetting the global duration to equal the length of the current workDurationInMinutes or break duration
    if (timer.currentType === 'work') {
      countDownReset()
      timerProgressSet(0)
      this.setState({
        duration: moment.duration(work.durationInMinute, 'm')
      })
    } else {
      countDownReset()
      timerProgressSet(0)
      this.setState({
        duration: moment.duration(rest.durationInMinute, 'm')
      })
    }
    // stop the timer started in pause
    clearInterval(this.distractionTimer)
    // stop the countDown timer
    clearInterval(this.Timer)
  };

  handlePause = () => {
    const { countDownPause, timer, distractionTimeIncrease } = this.props
    // if countDown status hasn't started then do nothing
    if (timer.currentType === 'notActive') {
      return
    }
    countDownPause()
    // if its a work timer
    if (timer.currentType === 'work') {
      // make a new distraction timer and count the time user is on break while pausing an active pomodoro session
      this.distractionTimer = setInterval(() => {
        // add 1 to total distractionTime
        distractionTimeIncrease()
      }, 1000)
    }
    // stop the current active workTimer
    clearInterval(this.Timer)
  };

  handleStart = () => {
    const { countDownStart, settingClose, timer, work, rest, statDistractionSet } = this.props
    // to make sure that setting is hidden out of view when timer is active
    settingClose()
    // if timer is active then do nothing if user press the start button
    if (timer.status === 'active') {
      return
    }
    // if the timer's status is 'notActive' then make a new timer and start countDown
    if (timer.status === 'notActive') {
      countDownStart()
      // Step1 set the duration local state. The duration state is just basically a moment duration object with helpful methods such as .minutes() to extract the minutes in an easy format. Duration length is determine by the timer current type
      if (timer.currentType === 'work') {
        this.setState({
          duration: moment.duration(minToMs(work.durationInMinute), 'ms')
        })
      } else {
        this.setState({
          duration: moment.duration(minToMs(rest.durationInMinute), 'ms')
        })
      }
      // set a new Timer and call doCountDown every second
      this.Timer = setInterval(this.doCountDown, 1000)
    }

    // if timer's status is 'pause' then resume the timer
    if (timer.status === 'pause') {
      if (timer.currentType === 'work') {
        // stop the distractionTimer
        clearInterval(this.distractionTimer)
        // set the timer status to active by calling countDownStart
        countDownStart()
        // set the distraction to plus1 on resumption of timer
        statDistractionSet()
        // resume the timer
        this.Timer = setInterval(this.doCountDown, 1000)
      } else {
        // set the timer status to active by calling countDownStart
        countDownStart()
        // resume the timer
        this.Timer = setInterval(this.doCountDown, 1000)
      }
    }
  };

  doCountDown = () => {
    const { timer, work, rest, timerProgressSet, workTimeIncrease, restTimeIncrease, countDownReset, timerTypeSet, statWorkCompleteSet, statRestCompleteSet, settings, alarmSoundPlayOn } = this.props

    // minus 1000ms from the current active workDuration which has the length of the timer in milliseconds update the state with the new time
    var currentTotalDuration = moment.duration(this.state.duration - 1000, 'ms')
    this.setState({
      duration: currentTotalDuration
    })

    // update appropriate state for the right timer type
    if (timer.currentType === 'work') {
      let workDuration = moment.duration(work.durationInMinute, 'm')
      let progress = 1 - (currentTotalDuration / workDuration)
      workTimeIncrease()
      timerProgressSet(progress)
    } else {
      let restDuration = moment.duration(rest.durationInMinute, 'm')
      let progress = 1 - (currentTotalDuration / restDuration)
      restTimeIncrease()
      timerProgressSet(progress)
    }

    // this code will run when the pomodoro timer or break completes i.e when timeRemaining is 0
    if (this.state.duration.asMilliseconds() <= 0) {
      if (timer.currentType === 'work') {
        countDownReset()
        timerTypeSet('rest')
        statWorkCompleteSet()
        this.setState({
          duration: moment.duration(rest.durationInMinute, 'm')
        })
      } else {
        countDownReset()
        timerTypeSet('work')
        statRestCompleteSet()
        this.setState({
          duration: moment.duration(work.durationInMinute, 'm')
        })
      }
      console.log('stopping timer')
      // stop the workTimer
      clearInterval(this.Timer)

      // if user activate Auto Start then restart the countDown for them add a slight delay to make the transition a bit smooth
      if (settings.autoBreak === true) {
        setTimeout(() => {
          this.handleStart()
        }, 200)
      }

      // if alarm notification is on then do send notification when timer is finished
      if (settings.alarmNotify === true) {
        // add 1s delay to get the timing right for the apperance of the notification
        setTimeout(() => {
          var options = {
            body: '',
            icon: img
          }
          // logic to make sure the right message body get send in the notification
          if (timer.currentType === 'rest') {
            options.body = "Let's get back to work."
            var n = new window.Notification('Break time is over', options)
            console.log(n)
          } else {
            options.body = "Awesome! You completed a Pomodoro session, take a break."
            var n2 = new window.Notification('Work Time is over', options)
            console.log(n2)
          }
        }, 200)
      }

      // logic to play alarm sound
      if (settings.alarmMute === false) {
        alarmSoundPlayOn()
      }
    }
  };
}