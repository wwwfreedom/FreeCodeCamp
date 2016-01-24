import React, { PropTypes } from 'react'
import sty from './Button.scss'

export default function Button ({value}) {
  return (
    <div className={sty.container}>
      <span>{value}</span>
    </div>
  )
}

Button.propTypes = {
  value: PropTypes.string.isRequired
}
