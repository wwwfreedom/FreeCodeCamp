import React, { Component, PropTypes } from 'react'
import sty from './ButtonsContainer.scss'
import FlatButton from 'material-ui/lib/flat-button'
import {yellow300, yellow400, yellow900, blue400, blue300, blue900, red400, red300, red900, green400, green300, green900} from 'styles/colors.js'

const style = {
  width: '100px',
  height: '100px',
  margin: '1em',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
}

export default class ButtonsContainer extends Component {
  static propTypes = {
    userGuessSet: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className={sty.container}>
        <FlatButton
          label='&#x200b;'
          style={style}
          backgroundColor={blue300}
          hoverColor={blue400}
          rippleColor={blue900}
          disabled={false}
          onClick={this.blueClick}
        />
        <FlatButton
          label='&#x200b;'
          style={style}
          backgroundColor={yellow300}
          hoverColor={yellow400}
          rippleColor={yellow900}
          disabled={false}
          onClick={this.yellowClick}
        />
        <FlatButton
          label='&#x200b;'
          style={style}
          backgroundColor={red300}
          hoverColor={red400}
          rippleColor={red900}
          disabled={false}
          onClick={this.redClick}
        />
        <FlatButton
          label='&#x200b;'
          style={style}
          backgroundColor={green300}
          hoverColor={green400}
          rippleColor={green900}
          disabled={false}
          onClick={this.greenClick}
        />
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
