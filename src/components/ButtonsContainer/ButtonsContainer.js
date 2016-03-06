import React, { Component, PropTypes } from 'react'
import sty from './ButtonsContainer.scss'
import Square from 'components/SimonGame/Square/Square'

export default class ButtonsContainer extends Component {
  static propTypes = {
    userGuessSet: PropTypes.func.isRequired,
    tileTrigger: PropTypes.string.isRequired
  };

  render() {
    const {tileTrigger, userGuessSet} = this.props
    return (
      <div className={sty.container}>
        <Square color={'red'} onClick={this.redClick} trigger={tileTrigger} />
        <Square color={'blue'} onClick={() => userGuessSet('blue')} trigger={tileTrigger}/>
        <Square color={'green'} onClick={this.greenClick} trigger={tileTrigger}/>
        <Square color={'yellow'} onClick={this.yellowClick} trigger={tileTrigger}/>
      </div>
    )
  };

  blueClick = () => {
    this.props.userGuessSet('blue')
  };

  redClick = () => {
    this.props.userGuessSet('red')
  };

  greenClick = () => {
    this.props.userGuessSet('green')
  };

  yellowClick = () => {
    this.props.userGuessSet('yellow')
  };
}
