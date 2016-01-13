import React, { Component, PropTypes } from 'react'
import sty from './DropDown.scss'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaAngleUp from 'react-icons/lib/fa/angle-up'
import { Link } from 'react-router'
import classNames from 'classnames/bind'

let cx = classNames.bind(sty)

export default class DropDown extends Component {
  static propTypes = {
    dropDownLinks: PropTypes.array.isRequired
  }

  state = {
    toggleState: false
  }

  render() {
    const { dropDownLinks } = this.props
    let dropDown = cx({
      dropDown: this.state.toggleState === false,
      dropDownOpen: this.state.toggleState === true
    })
    let containerDropDown = cx({
      container: this.state.toggleState === false,
      containerDropDown: this.state.toggleState === true
    })
    return (
      <div className={containerDropDown}>
        <div className={sty.header} onClick={this.handleClick}>
          <p>Portfolio</p>
          {this.state.toggleState === false ? <FaAngleDown /> : <FaAngleUp />}
        </div>
        <div className={dropDown}>
          {dropDownLinks.map((link, index) =>
            <Link
              to={`/${link}`}
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
    this.setState({ toggleState: !this.state.toggleState })
  }
}

