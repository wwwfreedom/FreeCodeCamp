import React, { PropTypes } from 'react'
import sty from './CardV2.scss'
import { Link } from 'react-router'

export default function CardV2 ({image, link, title, text, internalLink, externalLink}) {
  return (
    <div className={sty.container}>
      {externalLink
        ? <a href={link} target='_blank'>
            <div
              className={sty.image}
              style={{backgroundImage: `url('${image}')`}}
            >
            </div>
          </a>
        : <Link to={`/${link}`}>
          <div
            className={sty.image}
            style={{backgroundImage: `url('${image}')`}}
          >
          </div>
        </Link>
      }

      <div className={sty.content}>
        <div className={sty.header}>
          {externalLink
            ? <a href={link} target='_blank'><h3>{title}</h3></a>
            : <Link to={`/${link}`}><h3>{title}</h3></Link>
          }
        </div>

        <div className={sty.text}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

CardV2.propTypes = {
  image: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  internalLink: PropTypes.bool,
  externalLink: PropTypes.bool
}
