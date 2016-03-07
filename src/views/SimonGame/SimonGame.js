import React, { Component, PropTypes } from 'react'
import sty from './SimonGame.scss'
import { connect } from 'react-redux'
import { actions as SimonGameActions } from 'redux/modules/SimonGame/SimonGame.js'

import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer'
import OptionButtons from 'components/SimonGame/OptionButtons/OptionButtons'

const mapStateToProps = (state) => ({
  score: state.SimonGame.score,
  tileTrigger: state.SimonGame.tileTrigger,
  isWrong: state.SimonGame.isWrong,
  gameStatus: state.SimonGame.gameStatus
})

class SimonGame extends Component {
  static propTypes = {
    score: PropTypes.number.isRequired,
    userInput: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    tileTrigger: PropTypes.string.isRequired,
    start: PropTypes.func.isRequired,
    isWrong: PropTypes.string.isRequired,
    gameStatus: PropTypes.string.isRequired
  };

  render() {
    const {score, userInput, reset, tileTrigger, start} = this.props
    return (
      <div className={sty.container}>
        <ButtonsContainer
          userInput={userInput}
          tileTrigger={tileTrigger}
        />
        {this.renderStatus()}
        <div className={sty.score}>
          <span>{score}</span>
        </div>
        <OptionButtons reset={reset} start={start}/>
      </div>
    )
  };

  renderStatus = () => {
    const {isWrong, gameStatus} = this.props
    if (gameStatus === 'active') {
      if (isWrong === 'true') {
        return <div className={sty.wrong}>
          Wrong
        </div>
      }
      if (isWrong === 'false') {
        return <div className={sty.correct}>
          Correct
        </div>
      }
    }
  }
}

export default connect(mapStateToProps, SimonGameActions)(SimonGame)
