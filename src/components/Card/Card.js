import React, { PropTypes } from 'react'
import sty from './Card.scss'

export default function Card ({item}) {
  return (
    <div className={sty.container}>

    </div>
  )
}

Card.propTypes = {
  item: PropTypes.object.isRequired
}

