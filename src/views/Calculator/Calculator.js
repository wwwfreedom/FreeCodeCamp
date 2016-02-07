import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as CalcActions } from 'redux/modules/Calculator/Calculator'
import sty from './Calculator.scss'
import Button from 'components/Calculator/Button/Button'
import AnswerPanel from 'components/Calculator/AnswerPanel/AnswerPanel'

const mapStateToProps = (state) => ({
  output: state.Calculator.output
})

export class Calculator extends Component {
  static propTypes = {
    output: PropTypes.string.isRequired,
    calcButtonClick: PropTypes.func.isRequired,
    calcDotButtonClick: PropTypes.func.isRequired,
    calcReset: PropTypes.func.isRequired,
    calcAdd: PropTypes.func.isRequired,
    calcEqual: PropTypes.func.isRequired,
    calcMinus: PropTypes.func.isRequired,
    calcMultiply: PropTypes.func.isRequired,
    calcDivide: PropTypes.func.isRequired
  };

  render() {
    const { output, calcButtonClick, calcReset, calcAdd, calcEqual, calcDotButtonClick, calcMinus, calcMultiply, calcDivide } = this.props
    return (
      <div className={sty.container}>
        <h1>FreeCodeCamp Calculator Zipline</h1>
        <div className={sty.rowWrap}>
          <AnswerPanel answer={output}/>
        </div>
        <div className={sty.rowWrap}>
          <Button value={'C'} onClick={calcReset}/>
          <Button value={' '} />
          <Button value={' '} />
          <Button value={'÷'} onClick={calcDivide} background={'#FBF9E0'}/>
        </div>
        <div className={sty.rowWrap}>
          <Button value={'7'} onClick={calcButtonClick}/>
          <Button value={'8'} onClick={calcButtonClick}/>
          <Button value={'9'} onClick={calcButtonClick}/>
          <Button value={'×'} onClick={calcMultiply} background={'#FBF9E0'}/>
        </div>
        <div className={sty.rowWrap}>
          <Button value={'4'} onClick={calcButtonClick}/>
          <Button value={'5'} onClick={calcButtonClick}/>
          <Button value={'6'} onClick={calcButtonClick}/>
          <Button value={'−'} onClick={calcMinus} background={'#FBF9E0'}/>
        </div>
        <div className={sty.rowWrap}>
          <Button value={'1'} onClick={calcButtonClick}/>
          <Button value={'2'} onClick={calcButtonClick}/>
          <Button value={'3'} onClick={calcButtonClick}/>
          <Button value={'+'} onClick={calcAdd} background={'#FBF9E0'}/>
        </div>
        <div className={sty.rowWrap}>
          <Button value={'0'} onClick={calcButtonClick}/>
          <Button value={' '} />
          <Button value={'.'} onClick={calcDotButtonClick}/>
          <Button value={'='} onClick={calcEqual} background={'#FBF9E0'}/>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, CalcActions)(Calculator)

