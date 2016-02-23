import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as TicTacToeActions } from 'redux/modules/TicTacToe/TicTacToe.js'

import sty from './TicTacToe.scss'
import Tile from 'components/TicTacToe/Tile.js'
import Button from 'components/Button/Button'

const mapStateToProps = (state) => ({
  currentTurn: state.TicTacToe.currentTurn,
  gameState: state.TicTacToe.gameState,
  status: state.TicTacToe.status
})

class TicTacToe extends Component {
  static propTypes = {
    currentTurn: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    gameState: PropTypes.array.isRequired,
    tileSet: PropTypes.func.isRequired,
    boardInit: PropTypes.func.isRequired,
    playerTypeSet: PropTypes.func.isRequired,
    gameStatusSet: PropTypes.func.isRequired
  };

  render() {
    const {gameState, tileSet} = this.props
    return (
      <div className={sty.container}>
        <h1>Tic Tac Toe</h1>
        {this.renderOptionBarOrStatus()}
        <div className={sty.tilesContainer}>
          {gameState.map((tile) => {
            return <Tile type={tile.type} position={tile.position} />
          })}
        </div>
      </div>
    )
  }

  renderOptionBarOrStatus = () => {
    const {status} = this.props
    if (status === 'active') {
      return <div className={sty.status}><h3>Play</h3></div>
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
    playerTypeSet(e.target.text)
  }

  componentDidMount() {
    this.props.boardInit()
  }
}

export default connect(mapStateToProps, TicTacToeActions)(TicTacToe)

