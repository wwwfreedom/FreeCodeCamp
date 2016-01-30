import React, { PropTypes } from 'react'
import sty from './Button.scss'

export default function Button ({value, background, onClick}) {
  let style = {
    background: `${background}`
  }
  let onClickFn = onClick
  // ! coerce onClickFn into a boolean, if onClickFn exist this will return false so the second ! is to invert into true to make the logic flow readable
  // just a test to render input with onClick if onClick prop was pass in otherwise disabled the button.
  return (
    <div className={sty.container}>
      {!!onClickFn === true ? <input
        type="button"
        value={value}
        onClick={(e) => onClick(e.target.value)}
        style={style}
      /> : <input
        type="button"
        value={value}
        style={style}
        disabled
      />}
    </div>
  )
}

Button.propTypes = {
  value: PropTypes.string.isRequired,
  background: PropTypes.string,
  onClick: PropTypes.func
}
