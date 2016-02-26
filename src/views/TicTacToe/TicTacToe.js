import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as TicTacToeActions } from 'redux/modules/TicTacToe/TicTacToe.js'

import sty from './TicTacToe.scss'
import Tile from 'components/TicTacToe/Tile.js'
import Button from 'components/Button/Button'

const mapStateToProps = (state) => ({
  turn: state.TicTacToe.turn,
  tiles: state.TicTacToe.tiles,
  status: state.TicTacToe.status,
  winner: state.TicTacToe.winner
})

class TicTacToe extends Component {
  static propTypes = {
    turn: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    tiles: PropTypes.array.isRequired,
    tileSetIfValid: PropTypes.func.isRequired,
    playerTypeSet: PropTypes.func.isRequired,
    gameStatusSet: PropTypes.func.isRequired,
    winner: PropTypes.string.isRequired
  };

  render() {
    const {tiles, tileSetIfValid} = this.props
    return (
      <div className={sty.container}>
        <h1>Tic Tac Toe</h1>
        {this.renderOptionBarOrStatus()}
        <div className={sty.tilesContainer}>
          {tiles.map((tile, index) => {
            return <Tile type={tile} position={index} tileSetIfValid={tileSetIfValid} key={index}/>
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
    if (e.target.text === 'O') {
      playerTypeSet({computer: 'x', player: 'o'})
    } else {
      playerTypeSet({computer: 'o', player: 'x'})
    }
  }
}

export default connect(mapStateToProps, TicTacToeActions)(TicTacToe)

