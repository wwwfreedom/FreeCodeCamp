import React, { PropTypes } from 'react'
import Tappable from 'react-tappable'

import sty from './Square.scss'

export default function Square ({onClick, color, trigger}) {
  if (trigger === color) {
    return (
      <div className={sty[`active-${color}`]}></div>
    )
  } else {
    return (
      <Tappable
        onTap={onClick}
        classes={{
          active: sty[`active-${color}`],
          inactive: sty[`inactive-${color}`]
        }}
      />
    )
  }
}

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  trigger: PropTypes.string.isRequired
}
