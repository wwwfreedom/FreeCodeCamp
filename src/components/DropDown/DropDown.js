import React, { Component, PropTypes } from 'react'
import sty from './DropDown.scss'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaAngleUp from 'react-icons/lib/fa/angle-up'
import { Link } from 'react-router'
import classNames from 'classnames/bind'

let cx = classNames.bind(sty)

export default class DropDown extends Component {
  static propTypes = {
    dropDownLinks: PropTypes.array.isRequired,
    dropDownActivate: PropTypes.func.isRequired,
    dropDownStatus: PropTypes.bool.isRequired,
    mobileNavIsOpen: React.PropTypes.bool.isRequired,
    toggleMenu: React.PropTypes.func.isRequired
  };

  render() {
    const { dropDownLinks, dropDownActivate, dropDownStatus } = this.props
    let dropDown = cx({
      dropDown: dropDownStatus === false,
      dropDownOpen: dropDownStatus === true
    })
    let containerDropDown = cx({
      container: dropDownStatus === false,
      containerDropDown: dropDownStatus === true
    })
    return (
      <div className={containerDropDown}>
        <div className={sty.header} onClick={dropDownActivate}>
          <p>Portfolio</p>
          {dropDownStatus === false ? <FaAngleDown /> : <FaAngleUp />}
        </div>
        <div className={dropDown}>
          {dropDownLinks.map((link, index) =>
            <Link
              to={`/${link.replace(/ +/g, "")}`}
              key={index}
              onClick={this.handleClick}
              activeClassName={sty.activeLink}
            >
              {link}
          </Link>
          )}
        </div>
      </div>
    )
  }

  handleClick = () => {
    const { dropDownActivate, toggleMenu, mobileNavIsOpen } = this.props
    // close sidebar on navigating to new links if it's active otherwise toggle dropDown
    if (mobileNavIsOpen === true) {
      toggleMenu()
    }
    dropDownActivate()
  };
}