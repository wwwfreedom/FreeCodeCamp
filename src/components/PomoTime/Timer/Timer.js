import React, { Component, PropTypes } from 'react'
import sty from './Timer.scss'
import TimeDisplay from 'components/PomoTime/TimeDisplay/TimeDisplay'
// import moment from 'moment'
import FaPlay from 'react-icons/lib/fa/play'
import FaPause from 'react-icons/lib/fa/pause'
import FaClose from 'react-icons/lib/fa/close'
import FaCog from 'react-icons/lib/fa/cog'

export default class Timer extends Component {
  static propTypes = {
    timer: PropTypes.object.isRequired,
    work: PropTypes.object.isRequired,
    rest: PropTypes.object.isRequired
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
          <FaClose onClick={this.handleReset}/>
        </div>
      )
    } else {
      return (
        <div className={sty.iconSettings}>
          <FaCog onClick={this.activateSettings}/>
        </div>
      )
    }
  }

  renderButtons = () => {
    const { timer } = this.props
    if (timer.status === 'notActive' || timer.status === 'pause') {
      return (
        <div className={sty.icons}>
          <FaPlay onClick={this.handleStart}/>
        </div>
      )
    } else {
      return (
        <div className={sty.icons}>
          <FaPause onClick={this.handlePause}/>
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
    console.log('reseting')
  }

  handlePause = () => {
    console.log('pause')
  }

  handleStart = () => {
    console.log('start')
  }

  activateSettings = () => {
    console.log('setting')
  }
}