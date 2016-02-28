import React, { PropTypes } from 'react'
import sty from './Button.scss'

export default function Button (props) {
  const style = {width: props.width}
  return (
    <a
    className={sty.paperRaise}
    {...props} style={style}>
      {props.text}
    </a>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
}
