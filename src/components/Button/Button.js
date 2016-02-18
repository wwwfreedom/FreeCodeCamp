import React, { PropTypes } from 'react'
import sty from './Button.scss'

export default function Button (props) {
  return (
    <a
    className={sty.paperRaise}
    {...props}>
      {props.text}
    </a>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired
}
