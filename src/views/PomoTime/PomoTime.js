import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import { actions as PomoTimeActions } from
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
    rest: PropTypes.object
  }
  render() {
    const { pomoTime, timer, work, rest } = this.props
    return (
      <div className={sty.container}>
        <Title timer={timer.currentType}/>
        <Timer timer={timer} work={work} rest={rest} />
      </div>
    )
  }
}

export default connect(mapStateToProps)(PomoTime)