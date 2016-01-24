import React, { PropTypes } from 'react'
import sty from './Button.scss'

export default function Button ({value, background, onClick}) {
  let style = {
    background: `${background}`
  }
  return (
    <div className={sty.container} style={style}>
      <input
        type="button"
        value={value}
        onClick={(e) => onClick(e.target.value)}
      />
    </div>
  )
}

Button.propTypes = {
  value: PropTypes.string.isRequired,
  background: PropTypes.string
}
