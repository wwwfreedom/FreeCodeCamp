import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as TicTacToeActions } from 'redux/modules/TicTacToe/TicTacToe.js'

import sty from './TicTacToe.scss'
import Tile from 'components/TicTacToe/Tile.js'
import Button from 'components/Button/Button'

const mapStateToProps = (state) => ({
  currentTurn: state.TicTacToe.currentTurn,
  gameState: state.TicTacToe.gameState,
  status: state.TicTacToe.status,
  winner: state.TicTacToe.winner
})

class TicTacToe extends Component {
  static propTypes = {
    currentTurn: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    gameState: PropTypes.array.isRequired,
    tileSetIfValid: PropTypes.func.isRequired,
    boardInitIfNeeded: PropTypes.func.isRequired,
    playerTypeSet: PropTypes.func.isRequired,
    gameStatusSet: PropTypes.func.isRequired,
    winner: PropTypes.string.isRequired
  };

  render() {
    const {gameState, tileSetIfValid} = this.props
    return (
      <div className={sty.container}>
        <h1>Tic Tac Toe</h1>
        {this.renderOptionBarOrStatus()}
        <div className={sty.tilesContainer}>
          {gameState.map((tile) => {
            return <Tile type={tile.type} position={tile.position} win={tile.win} tileSetIfValid={tileSetIfValid} key={tile.position}/>
          })}
        </div>
      </div>
    )
  }

  renderOptionBarOrStatus = () => {
    const {status, winner} = this.props
    if (status === 'active') {
      return <div className={sty.status}><h3>Play</h3></div>
    } else if (status === 'won') {
      return <div className={sty.status}>
        <h3>{winner === 'human' ? 'Awesome you won' : 'Bad luck. The computer won'}</h3>
      </div>
    } else {
      return (
        <div className={sty.options}>
          <h2>Choose your option</h2>
          <div className={sty.buttons}>
            <Button text='O' width={123} onClick={this.playerTypeSet}/>
            <Button text='X' width={123} onClick={this.playerTypeSet}/>
          </div>
        </div>
      )
    }
  };

  playerTypeSet = (e) => {
    const {gameStatusSet, playerTypeSet} = this.props
    gameStatusSet('active')
    // set the option that player chose
    playerTypeSet(e.target.text)
  }

  componentDidMount() {
    this.props.boardInitIfNeeded()
  }
}

export default connect(mapStateToProps, TicTacToeActions)(TicTacToe)

