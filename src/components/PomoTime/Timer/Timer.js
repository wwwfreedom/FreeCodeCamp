import React, { Component, PropTypes } from 'react'
import sty from './Timer.scss'
import TimeDisplay from 'components/PomoTime/TimeDisplay/TimeDisplay'
// import moment from 'moment'
import MdPause from 'react-icons/lib/md/pause'
import MdClose from 'react-icons/lib/md/close'
import MdSettings from 'react-icons/lib/md/settings'
import MdPlayArrow from 'react-icons/lib/md/play-arrow'

export default class Timer extends Component {
  static propTypes = {
    timer: PropTypes.object.isRequired,
    work: PropTypes.object.isRequired,
    rest: PropTypes.object.isRequired,
    countDownStart: PropTypes.func.isRequired,
    countDownPause: PropTypes.func.isRequired,
    countDownReset: PropTypes.func.isRequired
  }
  state = {
  }
  render() {
    const { timer, work, rest } = this.props
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

    return (
    <div className={sty.container}>
      <div className={sty.radialProgress}>
        <div className={sty.time}>
          <TimeDisplay minute={25} second={5} />
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
  renderSettingButton = () => {
    const { timer } = this.props
    if (timer.status === 'active' || timer.status === 'pause') {
      return (
        <div className={sty.iconSettings}>
          <MdClose onClick={this.handleReset}/>
        </div>
      )
    } else {
      return (
        <div className={sty.iconSettings}>
          <MdSettings onClick={this.activateSettings}/>
        </div>
      )
    }
  }

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
  }
  // adjust the svg circle cicumference for small and big viewport
  dynamicDiameter = () => {
    if (window.innerWidth <= 320) {
      return 270
    } else {
      return 360
    }
  }

  handleReset = () => {
    this.props.countDownReset()
  }

  handlePause = () => {
    this.props.countDownPause()
  }

  handleStart = () => {
    this.props.countDownStart()
  }

  activateSettings = () => {
    console.log('setting')
  }
}