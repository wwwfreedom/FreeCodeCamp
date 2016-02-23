import React, { Component, PropTypes } from 'react'
import sty from './Tile.scss'

// import FaClose from 'react-icons/lib/fa/close'
// import FaCircleO from 'react-icons/lib/fa/circle-o'

export default class Tile extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired
  };

  render() {
    return (
      <div className={sty.container}>
        {this.renderTile()}
      </div>
    )
  }

  renderTile = () => {
    const {type, position} = this.props

    if (type === 'O') {
      return <button name={position} value='O' onClick={this.handleButtonClick}>O</button>
    } else if (type === 'X') {
      return <button name={position} value='X' onClick={this.handleButtonClick}>X</button>
    } else {
      // lesson: using zero width unicode character to fill in the blank button to maintain style consistency
      return <button name={position} value='' onClick={this.handleButtonClick}>&#8203;</button>
    }
  };

  handleButtonClick = (e) => {
    console.log(e.target.value)
    console.log(e.target.name)
  }
}
