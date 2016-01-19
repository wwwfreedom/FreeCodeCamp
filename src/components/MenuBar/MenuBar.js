import React, { Component } from 'react'
import { Link } from 'react-router'
import sty from './MenuBar.scss'
import MenuButton from '../../components/MenuButton/MenuButton.js'
import DropDown from 'components/DropDown/DropDown'

export default class MenuBar extends Component {
  static propTypes = {
    mobileNavIsOpen: React.PropTypes.bool.isRequired,
    toggleMenu: React.PropTypes.func.isRequired,
    menuLinks: React.PropTypes.array.isRequired,
    dropDownLinks: React.PropTypes.array.isRequired,
    dropDownActivate: React.PropTypes.func.isRequired,
    dropDownStatus: React.PropTypes.bool.isRequired
  }
  render() {
    const { dropDownLinks, dropDownActivate, dropDownStatus, toggleMenu, mobileNavIsOpen } = this.props
    return (
      <div className={sty.container}>
        <div className={sty.brand}>
          <Link to='/'>Kevin Truong</Link>
        </div>
        <nav role='navigation' className={sty.navigation}>
          <DropDown
            dropDownLinks={dropDownLinks}
            dropDownStatus={dropDownStatus}
            dropDownActivate={dropDownActivate}
            toggleMenu={toggleMenu}
            mobileNavIsOpen={mobileNavIsOpen}
          />
          {this.renderMenuLinks()}
        </nav>
        <div className={sty.mobileNavTrigger}>
          <MenuButton navStatus={this.props.mobileNavIsOpen} onClick={this.handleMenuClick}/>
        </div>
      </div>
    )
  }

  renderMenuLinks = () => {
    const { menuLinks } = this.props
    return (
      menuLinks.map((link, index) =>
        <Link
          to={`/${link}`}
          activeClassName={sty.activeLink}
          key={index}
          onClick={this.handleLinkClick}
        >
          {link}
        </Link>
      )
    )
  }

  // toggle sidebar on click of hamburger menu
  handleMenuClick = () => {
    this.props.toggleMenu()
  }

  // close dropdown on closing sidebar or navigating to new links
  handleLinkClick = () => {
    if (this.props.dropDownStatus === true) {
      this.props.dropDownActivate()
    }
  }
}
