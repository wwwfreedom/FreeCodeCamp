import React, { Component, PropTypes } from 'react'
import sty from './UserCard.scss'

export default class UserCard extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired

  };

  render() {
    return (
      <div className={sty.container}>
        <div className={sty.image}>
          <div className={sty.imageWrap}>
            <img src="https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg" alt=""/>
          </div>
        </div>
        <div className={sty.content}>
          <h3>Kevin Truong</h3>
          <p>The title of my stream is awesome...</p>
          <div className={sty.closed}>
            <span>Online</span>
          </div>
        </div>
      </div>
    )
  }
}
