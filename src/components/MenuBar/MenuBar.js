import React, { Component } from 'react'
import { Link } from 'react-router'
import sty from './MenuBar.scss'
import MenuButton from '../../components/MenuButton/MenuButton.js'
// import TiThMenu from 'react-icons/lib/ti/th-menu'

export default class MenuBar extends Component {
  state = {
    mobileNavStatus: false
  }
  render() {
    return (
      <div className={sty.container}>
        <div className={sty.brand}>Kevin Truong</div>
        <nav role='navigation' className={sty.navigation}>
          <Link to='/quotes'>Quotes</Link>
          <Link to='/pomoTimer'>Pomodoro Timer</Link>
          <Link to='/about'>About</Link>
        </nav>
        <nav role='navigation' className={sty.mobileNav}>
          <MenuButton navStatus={this.state.mobileNavStatus} onClick={this.handleMenuClick}/>
        </nav>
      </div>
    )
  }

  handleMenuClick = () => {
    this.setState({
      mobileNavStatus: !this.state.mobileNavStatus
    })
    console.log('clicked')
  }
}
