import React, { Component } from 'react'
import { Link } from 'react-router'
import sty from './MenuBar.scss'
import MenuButton from '../../components/MenuButton/MenuButton.js'

export default class MenuBar extends Component {
  static propTypes = {
    mobileNavIsOpen: React.PropTypes.bool.isRequired,
    toggleMenu: React.PropTypes.func.isRequired
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
        <div className={sty.mobileNavTrigger}>
          <MenuButton navStatus={this.props.mobileNavIsOpen} onClick={this.props.toggleMenu}/>
        </div>
      </div>
    )
  }
}
