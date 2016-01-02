import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { Link } from 'react-router'
import sty from './SideBar.scss'

let cx = classNames.bind(sty)

export default class SideBar extends Component {
  static propTypes = {
    mobileNavIsOpen: React.PropTypes.bool.isRequired,
    toggleMenu: React.PropTypes.func.isRequired
  }
  render() {
    let mobileNav = cx({
      mobileNavClose: this.props.mobileNavIsOpen,
      mobileNavOpen: this.props.mobileNavIsOpen
    })
    let menu = cx({
      menuClose: this.props.mobileNavIsOpen === false,
      menuOpen: this.props.mobileNavIsOpen
    })
    return (
      // the mobileNavOffTrigger here is allow user to turn off the mobile nav when they click outside of the mobile nav
      <div className={mobileNav}>
      <div className={sty.mobileNavOffTrigger} onClick={this.props.toggleMenu}></div>
        <div className={menu}>
          <nav role='navigation' className={sty.menuContent}>
            <Link to='/quotes' onClick={this.props.toggleMenu}>Quotes</Link>
            <Link to='/pomoTimer' onClick={this.props.toggleMenu}>Pomodoro Timer</Link>
            <Link to='/about' onClick={this.props.toggleMenu}>About</Link>
          </nav>
        </div>
      </div>
    )
  }

  componentDidMount() {
    window.onkeydown = this.listenForClose
  }
  componentWillUnmount() {
    window.onkeydown = null
  }
  // this allow trigger of mobile via passing in props
  // componentWillReceiveProps(nextProps) {
  //   // Allow open props to be controlled by props
  //   if (nextProps.mobileNavIsOpen !== this.props.mobileNavIsOpen) {
  //     this.props.toggleMenu()
  //   }
  // }
  // listen to escape key to close mobile nav
  listenForClose = (e) => {
    e = e || window.event

    if (this.props.mobileNavIsOpen === true && (e.key === 'Escape' || e.keyCode === 27)) {
      this.props.toggleMenu()
    }
  }
}

