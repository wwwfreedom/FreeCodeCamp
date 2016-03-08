import React, { PropTypes } from 'react'
import Tappable from 'react-tappable'

import sty from './Square.scss'
import AudioPlayer from 'components/PomoTime/AudioPlayer/AudioPlayer'

export default function Square ({onClick, color, trigger, tileSoundPlaying, tileSoundPlayOff, source}) {
  // return an active square if trigger exist and match the color. Effect is only simultate square press.
  if (trigger === color) {
    return (
      <div>
        <div className={sty[`active-${color}`]}></div>
        <AudioPlayer
          source={source}
          isPlaying={trigger === color}
          onEnd={tileSoundPlayOff}
        />
      </div>
    )
  } else {
    // return a normal tappable square
    return (
      <Tappable
        onTap={onClick}
        classes={{
          active: sty[`active-${color}`],
          inactive: sty[`inactive-${color}`]
        }}
      >
        <AudioPlayer
          source={source}
          isPlaying={tileSoundPlaying === color}
          onEnd={tileSoundPlayOff}
        />
      </Tappable>
    )
  }
}

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  trigger: PropTypes.string.isRequired
}
