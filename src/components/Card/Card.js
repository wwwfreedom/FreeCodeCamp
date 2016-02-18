import React, { PropTypes } from 'react'
import { isEmpty } from 'lodash'
import sty from './Card.scss'

export default function Card ({item}) {
  return (
    <div className={sty.container}>
      {isEmpty(item.thumbnail)
        ? <div className={sty.noImage}></div>
        : <div className={sty.image} style={{backgroundImage: `url('${item.thumbnail.source}')`}}>
          </div>
      }
      <div className={sty.content}>
        <div className={sty.header}>
          <h3>{item.title}</h3>
        </div>
        <div className={sty.text}>
          <p>{item.extract}</p>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  item: PropTypes.object.isRequired
}

