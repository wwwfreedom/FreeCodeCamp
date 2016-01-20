import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import { actions as PomoTimeActions } from
import sty from './PomoTime.scss'
import Title from 'components/PomoTime/Title/Title'

const mapStateToProps = (state) => ({
  pomoTime: state.PomoTime
})

export class PomoTime extends Component {
  static propTypes = {
    pomoTime: PropTypes.object
  }
  render() {
    const { pomoTime } = this.props
    return (
      <div className={sty.container}>
        <Title timer={pomoTime.timer.currentType}/>
      </div>
    )
  }
}

export default connect(mapStateToProps)(PomoTime)