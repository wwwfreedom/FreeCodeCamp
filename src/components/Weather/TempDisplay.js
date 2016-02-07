import React, { PropTypes } from 'react'
import sty from './TempDisplay.scss'

export default function TempDisplay ({temp, unit, onClick}) {
  if (unit === 'deg') {
    return (
      <div className={sty.container} onClick={onClick}>
        {temp}
        <span>&deg;</span>
      </div>
    )
  } else {
    return (
      <div className={sty.container} onClick={onClick}>
        {temp}
        <span>&#8457;</span>
      </div>
    )
  }
}

TempDisplay.propTypes = {
  temp: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired
}
