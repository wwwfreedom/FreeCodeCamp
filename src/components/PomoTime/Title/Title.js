import React, { PropTypes } from 'react'
import sty from './Title.scss'

export default function Title ({timer}) {
  return (
    <div className={sty.title}>
      <h1>{`${timer} time`}</h1>
    </div>
  )
}

Title.propTypes = {
  timer: PropTypes.string.isRequired
}