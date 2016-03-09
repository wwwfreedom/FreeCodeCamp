import React, { Component, PropTypes } from 'react'
import sty from './SimonGame.scss'
import { connect } from 'react-redux'
import { actions as SimonGameActions } from 'redux/modules/SimonGame/SimonGame.js'

import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer'
import OptionButtons from 'components/SimonGame/OptionButtons/OptionButtons'
import MdClear from 'react-icons/lib/md/clear'
import MdCheck from 'react-icons/lib/md/check'

const mapStateToProps = (state) => ({
  score: state.SimonGame.score,
  tileTrigger: state.SimonGame.tileTrigger,
  isWrong: state.SimonGame.isWrong,
  gameStatus: state.SimonGame.gameStatus,
  hardMode: state.SimonGame.hardMode,
  tileSoundPlaying: state.SimonGame.tileSoundPlaying,
  animating: state.SimonGame.animating
})

class SimonGame extends Component {
  static propTypes = {
    score: PropTypes.number.isRequired,
    userInput: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    tileTrigger: PropTypes.string.isRequired,
    start: PropTypes.func.isRequired,
    isWrong: PropTypes.string.isRequired,
    gameStatus: PropTypes.string.isRequired,
    hardModeSet: PropTypes.func.isRequired,
    hardMode: PropTypes.bool.isRequired,
    tileSoundPlayOn: PropTypes.func.isRequired,
    tileSoundPlayOff: PropTypes.func.isRequired,
    tileSoundPlaying: PropTypes.string.isRequired,
    animating: PropTypes.bool.isRequired
  };

  render() {
    const {userInput, handleReset, tileTrigger, start, score, hardModeSet, hardMode, tileSoundPlayOn, tileSoundPlayOff, tileSoundPlaying, animating} = this.props
    return (
      <div className={sty.container}>
        <h1>Simon Game</h1>
        <ButtonsContainer
          userInput={userInput}
          tileTrigger={tileTrigger}
          tileSoundPlayOff={tileSoundPlayOff}
          tileSoundPlayOn={tileSoundPlayOn}
          tileSoundPlaying={tileSoundPlaying}
          animating={animating}
        />
        <div className={sty.score}>
         {score > 0 ? `Round ${score}` : ''}
        </div>
        {this.renderStatusScore()}
        <OptionButtons
          reset={handleReset}
          start={start}
          hardModeSet={hardModeSet}
          toggleState={hardMode}
        />
      </div>
    )
  };

  renderStatusScore = () => {
    const {isWrong, gameStatus} = this.props
    if (gameStatus === 'active') {
      if (isWrong === 'true') {
        return <div className={sty.wrong}>
          <MdClear />
        </div>
      }
      if (isWrong === 'false') {
        return <div className={sty.correct}>
          <MdCheck />
        </div>
      }
    }
    if (gameStatus === 'won') {
      return <div className={sty.won}>
        Congrats you won the game! :)
      </div>
    }
  }
}

export default connect(mapStateToProps, SimonGameActions)(SimonGame)
