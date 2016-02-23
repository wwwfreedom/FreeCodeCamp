import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as TicTacToeActions } from 'redux/modules/TicTacToe/TicTacToe.js'

import sty from './TicTacToe.scss'
import Tile from 'components/TicTacToe/Tile.js'

const mapStateToProps = (state) => ({
  currentTurn: state.TicTacToe.currentTurn,
  gameState: state.TicTacToe.gameState
})

class TicTacToe extends Component {
  static propTypes = {
    currentTurn: PropTypes.string.isRequired,
    gameState: PropTypes.array.isRequired,
    tileSet: PropTypes.func.isRequired,
    boardInit: PropTypes.func.isRequired
  };

  render() {
    const {gameState, tileSet} = this.props
    return (
      <div className={sty.container}>
        <h1>Tic Tac Toe</h1>
        <div className={sty.tilesContainer}>
          {gameState.map((tile) => {
            return <Tile type={tile.type} position={tile.position} />
          })}
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.boardInit()
  }
}

export default connect(mapStateToProps, TicTacToeActions)(TicTacToe)

