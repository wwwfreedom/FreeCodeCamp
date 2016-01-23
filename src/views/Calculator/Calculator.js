import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import sty from './Calculator.scss'

const mapStateToProps = (state) => ({
  number: state.Calculator.number
})

export class Calculator extends Component {
  static propTypes = {
    number: PropTypes.number.isRequired
  }
  render() {
    const { number } = this.props
    return (
      <div className={sty.container}>
        {number}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Calculator)

