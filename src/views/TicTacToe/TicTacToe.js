import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { actions as TicTacToeActions } from 'redux/modules/TicTacToe/TicTacToe.js'

import sty from './TicTacToe.scss'
import Tile from 'components/TicTacToe/Tile.js'
import Button from 'components/Button/Button'

const mapStateToProps = (state) => ({
  turn: state.TicTacToe.turn,
  tiles: state.TicTacToe.tiles,
  status: state.TicTacToe.status,
  winner: state.TicTacToe.winner,
  winningCombo: state.TicTacToe.winningCombo,
  computer: state.TicTacToe.computer,
  player: state.TicTacToe.player,
  stats: state.TicTacToe.stats
})

class TicTacToe extends Component {
  static propTypes = {
    turn: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    tiles: PropTypes.array.isRequired,
    tileSetIfValid: PropTypes.func.isRequired,
    playerTypeSet: PropTypes.func.isRequired,
    gameStatusSet: PropTypes.func.isRequired,
    winner: PropTypes.string.isRequired,
    computer: PropTypes.string.isRequired,
    player: PropTypes.string.isRequired,
    tileSet: PropTypes.func.isRequired,
    gameHardReset: PropTypes.func.isRequired,
    gameSoftReset: PropTypes.func.isRequired,
    winningCombo: PropTypes.array.isRequired,
    stats: PropTypes.object.isRequired
  };

  render() {
    const {tiles, tileSetIfValid, computer, player, stats} = this.props
    return (
      <div className={sty.container}>
        <h1>Tic Tac Toe</h1>
        {this.renderOptionOrReset()}
        <div className={sty.status}>
          <div className={sty.statusUnit}>
            <h5>Player({player})</h5>
            <p>{stats.player}</p>
          </div>
          <div className={sty.statusUnit}>
            <h5>Ties</h5>
            <p>{stats.ties}</p>
          </div>
          <div className={sty.statusUnit}>
            <h5>Computer({computer})</h5>
            <p>{stats.computer}</p>
          </div>
        </div>
        <div className={sty.tilesContainer}>
          {tiles.map((tile, index) => {
            return <Tile type={tile} position={index} tileSetIfValid={tileSetIfValid} key={index} ref={index}/>
          })}
        </div>
      </div>
    )
  }

  renderOptionOrReset = () => {
    const {status, gameHardReset} = this.props
    if (status === 'active') {
      return (
        <div className={sty.status}>
          <Button text='Reset' width={123} onClick={gameHardReset}/>
        </div>
      )
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
    const {gameStatusSet, playerTypeSet, tileSet, gameSoftReset} = this.props
    gameStatusSet('active')
    // set the option that player chose
    if (e.target.text === 'O') {
      playerTypeSet({computer: 'x', player: 'o'})
      gameSoftReset()
      // computer make the first move by random setting tiles
      tileSet(Math.floor(Math.random() * (9)), 'x')
    } else {
      playerTypeSet({computer: 'o', player: 'x'})
      gameSoftReset()
      tileSet(Math.floor(Math.random() * (9)), 'o')
    }
  }

  // Lesson: using refs as a hackey way to add background to the actual dom component. The right way would to do via redux store passing down props and changing in the component.
  componentWillReceiveProps(nextProps) {
    if (nextProps.winningCombo.length === 3) {
      nextProps.winningCombo.forEach(position => {
        ReactDOM.findDOMNode(this.refs[position]).style.backgroundColor = 'red'
      })
    } else {
      this.props.winningCombo.forEach(position => {
        ReactDOM.findDOMNode(this.refs[position]).style.backgroundColor = ''
      })
    }
  }
}

export default connect(mapStateToProps, TicTacToeActions)(TicTacToe)

