import React, { PropTypes } from 'react'
import sty from './TempDisplay.scss'

export default function TempDisplay ({temp, unit}) {
  if (unit === 'deg') {
    return (
      <div className={sty.container}>
        {temp}
        <span>&deg;</span>
      </div>
    )
  } else {
    return (
      <div className={sty.container}>
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
