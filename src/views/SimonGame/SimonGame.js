import React, { Component, PropTypes } from 'react'
import sty from './SimonGame.scss'
import { connect } from 'react-redux'
import { actions as SimonGameActions } from 'redux/modules/SimonGame/SimonGame.js'

import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer'

const mapStateToProps = (state) => ({
  score: state.SimonGame.score
})

class SimonGame extends Component {
  static propTypes = {
    score: PropTypes.number.isRequired
  };

  render() {
    const {score, userGuessSet} = this.props
    return (
      <div className={sty.container}>
        <ButtonsContainer
          userGuessSet={userGuessSet}
        />
        {score}
      </div>
    )
  };
}

export default connect(mapStateToProps, SimonGameActions)(SimonGame)
