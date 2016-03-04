import React, { Component, PropTypes } from 'react'
import sty from './SimonGame.scss'
import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer'

export default class SimonGame extends Component {
  static propTypes = {
    a: PropTypes.string
  };

  render() {
    return (
      <div className={sty.container}>
        <ButtonsContainer />
      </div>
    )
  };
}
