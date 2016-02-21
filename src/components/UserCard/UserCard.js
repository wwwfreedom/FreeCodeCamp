import React, { Component, PropTypes } from 'react'
import {isEmpty} from 'lodash'
import sty from './UserCard.scss'

export default class UserCard extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    statusText: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired
  };

  render() {
    const {image, link, status, userName, statusText} = this.props
    return (
      <div className={sty.container}>
        <div className={sty.image}>
          <div className={sty.imageWrap}>
            <img src={image} alt={userName}/>
          </div>
        </div>
        <div className={sty.content}>
          <a href={link}><h3>{userName}</h3></a>
          <p>{statusText}</p>
          <div className={sty.closed}>
            <span>{status}</span>
          </div>
        </div>
      </div>
    )
  }
}
