import React, { Component, PropTypes } from 'react'
import sty from './ButtonsContainer.scss'
import Square from 'components/SimonGame/Square/Square'

export default class ButtonsContainer extends Component {
  static propTypes = {
    userInput: PropTypes.func.isRequired,
    tileTrigger: PropTypes.string.isRequired,
    tileSoundPlayOn: PropTypes.func.isRequired,
    tileSoundPlayOff: PropTypes.func.isRequired,
    tileSoundPlaying: PropTypes.string.isRequired,
    animating: PropTypes.bool.isRequired
  };

  render() {
    const {tileTrigger, tileSoundPlaying, tileSoundPlayOn, tileSoundPlayOff} = this.props
    return (
      <div className={sty.container}>
        <Square
          color={'red'}
          onClick={this.redClick}
          trigger={tileTrigger}
          tileSoundPlaying={tileSoundPlaying}
          tileSoundPlayOn={tileSoundPlayOn}
          tileSoundPlayOff={tileSoundPlayOff}
          source={'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'}
        />
        <Square
          color={'blue'}
          onClick={this.blueClick}
          trigger={tileTrigger}
          tileSoundPlaying={tileSoundPlaying}
          tileSoundPlayOn={tileSoundPlayOn}
          tileSoundPlayOff={tileSoundPlayOff}
          source={'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'}
        />
        <Square
          color={'green'}
          onClick={this.greenClick}
          trigger={tileTrigger}
          tileSoundPlaying={tileSoundPlaying}
          tileSoundPlayOn={tileSoundPlayOn}
          tileSoundPlayOff={tileSoundPlayOff}
          source={'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'}
        />
        <Square
          color={'yellow'}
          onClick={this.yellowClick}
          trigger={tileTrigger}
          tileSoundPlaying={tileSoundPlaying}
          tileSoundPlayOn={tileSoundPlayOn}
          tileSoundPlayOff={tileSoundPlayOff}
          source={'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'}
        />
      </div>
    )
  };

  blueClick = () => {
    this.props.userInput('blue')
    // to prevent sounds from playing when user press tiles during animation
    if (this.props.animating === false) {
      this.props.tileSoundPlayOn('blue')
    }
  };

  redClick = () => {
    this.props.userInput('red')
    if (this.props.animating === false) {
      this.props.tileSoundPlayOn('red')
    }
  };

  greenClick = () => {
    this.props.userInput('green')
    if (this.props.animating === false) {
      this.props.tileSoundPlayOn('green')
    }
  };

  yellowClick = () => {
    this.props.userInput('yellow')
    if (this.props.animating === false) {
      this.props.tileSoundPlayOn('yellow')
    }
  };
}
