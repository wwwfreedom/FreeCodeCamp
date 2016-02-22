import React, { Component, PropTypes } from 'react'
import sty from './TicTacToe.scss'

export default class TicTacToe extends Component {
  static propTypes = {
    play: PropTypes.string
  };

  render() {
    return (
      <div className={sty.container}>TicTacToe</div>
    )
  }
}
