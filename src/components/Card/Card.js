import { isEmpty } from 'lodash'
import React, { PropTypes } from 'react'
import sty from './Card.scss'

export default function Card ({item}) {
  return (
    <div className={sty.container}>
      {isEmpty(item.thumbnail)
        ? <div></div>
        : <a href={`http://simple.wikipedia.org/?curid=${item.pageid}`} target='_blank'>
            <div className={sty.image} style={{backgroundImage: `url('${item.thumbnail.source}')`}}>
            </div>
          </a>
      }
      <div className={sty.content}>
        <div className={sty.header}>
          <a href={`http://simple.wikipedia.org/?curid=${item.pageid}`} target='_blank'>
            <h3>{item.title}</h3>
          </a>
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

