import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import sty from './Calculator.scss'
import Button from 'components/Calculator/Button/Button'
import AnswerPanel from 'components/Calculator/AnswerPanel/AnswerPanel'

const mapStateToProps = (state) => ({
  number: state.Calculator.number,
  answer: state.Calculator.answer
})

export class Calculator extends Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    answer: PropTypes.string.isRequired
  }
  render() {
    const { number, answer } = this.props
    return (
      <div className={sty.container}>
        <div className={sty.rowWrap}>
          <AnswerPanel answer={answer}/>
        </div>
        <div className={sty.rowWrap}>
          <Button value={number}/>
          <Button value={number}/>
          <Button value={number}/>
          <Button value={number}/>
        </div>
        <div className={sty.rowWrap}>
          <Button value={number}/>
          <Button value={number}/>
          <Button value={number}/>
          <Button value={number}/>
        </div>
        <div className={sty.rowWrap}>
          <Button value={number}/>
          <Button value={number}/>
          <Button value={number}/>
          <Button value={number}/>
        </div>
        <div className={sty.rowWrap}>
          <Button value={number}/>
          <Button value={number}/>
          <Button value={number}/>
          <Button value={number}/>
        </div>
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

