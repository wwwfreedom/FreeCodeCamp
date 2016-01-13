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
    dropDownLinks: React.PropTypes.array.isRequired
  }
  render() {
    return (
      <div className={sty.container}>
        <div className={sty.brand}>
          <Link to='/'>Kevin Truong</Link>
        </div>
        <nav role='navigation' className={sty.navigation}>
          <DropDown links={this.props.dropDownLinks}/>
          {this.renderMenuLinks()}
        </nav>
        <div className={sty.mobileNavTrigger}>
          <MenuButton navStatus={this.props.mobileNavIsOpen} onClick={this.props.toggleMenu}/>
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
        >
          {link}
        </Link>
      )
    )
  }
}
