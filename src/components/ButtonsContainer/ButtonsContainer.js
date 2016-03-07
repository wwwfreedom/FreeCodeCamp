import React, { Component, PropTypes } from 'react'
import sty from './ButtonsContainer.scss'
import Square from 'components/SimonGame/Square/Square'

export default class ButtonsContainer extends Component {
  static propTypes = {
    userInput: PropTypes.func.isRequired,
    tileTrigger: PropTypes.string.isRequired
  };

  render() {
    const {tileTrigger, userInput} = this.props
    return (
      <div className={sty.container}>
        <Square color={'red'} onClick={this.redClick} trigger={tileTrigger} />
        <Square color={'blue'} onClick={() => userInput('blue')} trigger={tileTrigger}/>
        <Square color={'green'} onClick={this.greenClick} trigger={tileTrigger}/>
        <Square color={'yellow'} onClick={this.yellowClick} trigger={tileTrigger}/>
      </div>
    )
  };

  blueClick = () => {
    this.props.userInput('blue')
  };

  redClick = () => {
    this.props.userInput('red')
  };

  greenClick = () => {
    this.props.userInput('green')
  };

  yellowClick = () => {
    this.props.userInput('yellow')
  };
}
