import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import sty from './Calculator.scss'
import Button from 'components/Calculator/Button/Button'

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
        <div className={sty.rowWrap}>
          <Button value={number}/>
          <Button value={number}/>
          <Button value={number}/>
          <Button value={number}/>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Calculator)

