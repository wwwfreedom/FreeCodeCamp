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
    countDownReset: PropTypes.func.isRequired
  }
  render() {
    const { timer, work, rest, countDownStart, countDownPause, countDownReset } = this.props
    return (
      <div className={sty.container}>
        <Title timer={timer.currentType}/>
        <Timer
          timer={timer}
          work={work}
          rest={rest}
          countDownStart={countDownStart}
          countDownPause={countDownPause}
          countDownReset={countDownReset}
         />
      </div>
    )
  }
}

export default connect(mapStateToProps, PomoTimeActions)(PomoTime)