import React, { PropTypes } from 'react'
import sty from './Button.scss'

export default function Button ({value, background}) {
  let style = {
    background: `${background}`
  }
  return (
    <div className={sty.container} style={style}>
      <span>{value}</span>
    </div>
  )
}

Button.propTypes = {
  value: PropTypes.string.isRequired
}
