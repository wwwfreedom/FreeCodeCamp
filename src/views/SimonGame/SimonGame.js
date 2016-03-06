import React, { Component, PropTypes } from 'react'
import sty from './SimonGame.scss'
import { connect } from 'react-redux'
import { actions as SimonGameActions } from 'redux/modules/SimonGame/SimonGame.js'

import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer'
import OptionButtons from 'components/SimonGame/OptionButtons/OptionButtons'

const mapStateToProps = (state) => ({
  score: state.SimonGame.score,
  tileTrigger: state.SimonGame.tileTrigger
})

class SimonGame extends Component {
  static propTypes = {
    score: PropTypes.number.isRequired,
    userGuessSet: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    tileTrigger: PropTypes.string.isRequired,
    start: PropTypes.func.isRequired
  };

  render() {
    const {score, userGuessSet, reset, tileTrigger, start} = this.props
    return (
      <div className={sty.container}>
        <ButtonsContainer
          userGuessSet={userGuessSet}
          tileTrigger={tileTrigger}
        />
        <div className={sty.score}>
          <span>{score}</span>
        </div>
        <OptionButtons reset={reset} start={start}/>
      </div>
    )
  };
}

export default connect(mapStateToProps, SimonGameActions)(SimonGame)
