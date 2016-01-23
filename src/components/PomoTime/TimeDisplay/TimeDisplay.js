import React, { PropTypes } from 'react'
import sty from './TimeDisplay.scss'

export default function TimeDisplay ({minute, second}) {
  return (
    <div className={sty.container}>
      {renderMinute(minute)} : {renderSecond(second)}
    </div>
  )
}

TimeDisplay.propTypes = {
  minute: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired
}

function renderMinute (minute) {
  if (minute < 10 || minute === 0) {
    // logic to add extra 0 if minute is less than 10 using es6 string literal
    return `0${minute.toString()}`
  }
  // check to only return if minute is between 0 and 60
  if (minute > 0 && minute <= 60) {
    return minute.toString()
  }
  // if fail check above return string of double 0
  return '00'
}

function renderSecond (second) {
  if (second < 10 || second === 0) {
    return `0${second.toString()}`
  }
  // check to only return if second is between 0 and 60
  if (second > 0 && second <= 60) {
    return second.toString()
  }
  // if fail check above return string of double 0
  return '00'
}