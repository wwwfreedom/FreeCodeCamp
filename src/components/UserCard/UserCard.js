import React, { Component, PropTypes } from 'react'
import sty from './UserCard.scss'
import classNames from 'classnames/bind'

let cx = classNames.bind(sty)

export default class UserCard extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    link: PropTypes.string,
    statusText: PropTypes.string,
    userName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  };

  render() {
    const {image, link, status, userName, statusText} = this.props
    const statusStyle = cx({
      online: status === 'Online',
      offline: status === 'Offline',
      closed: status === 'Account closed'
    })
    return (
      <div className={sty.container}>
        <div className={sty.image}>
          <div className={sty.imageWrap}>
            <img src={image} alt={userName}/>
          </div>
        </div>
        <div className={sty.content}>
          <a href={link} target='_blank'>
            <h3>{userName}</h3>
          </a>
          <p>{statusText}</p>
          <div className={statusStyle}>
            <span>{status}</span>
          </div>
        </div>
      </div>
    )
  }
}
