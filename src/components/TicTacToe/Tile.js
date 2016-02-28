import React, { Component, PropTypes } from 'react'
import sty from './Tile.scss'

// to highlight the winning combo coudld pass down the winning combo position and have a check to match the position of the tile with the position of the winning position to add on extra background
export default class Tile extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    tileSetIfValid: PropTypes.func.isRequired,
    win: PropTypes.bool
  };

  render() {
    return (
      <div className={sty.container}>
        {this.renderTile()}
      </div>
    )
  }

  renderTile = () => {
    const {type, win} = this.props
    let style = {background: 'red'}
    if (win) {
      if (type === 'o') {
        return <button onClick={this.handleButtonClick} style={style} >O</button>
      } else {
        return <button onClick={this.handleButtonClick} style={style} >X</button>
      }
    }
    if (type === 'o') {
      return <button onClick={this.handleButtonClick} >O</button>
    } else if (type === 'x') {
      return <button onClick={this.handleButtonClick} >X</button>
    } else {
      // lesson: using zero width unicode character to fill in the blank button to maintain style consistency
      return <button onClick={this.handleButtonClick}>&#8203;</button>
    }
  };

  handleButtonClick = (e) => {
    const {tileSetIfValid, position} = this.props
    tileSetIfValid(position)
  }
}
