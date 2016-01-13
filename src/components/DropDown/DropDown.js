import React, { Component, PropTypes } from 'react'
import sty from './DropDown.scss'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaAngleUp from 'react-icons/lib/fa/angle-up'
import { Link } from 'react-router'
import classNames from 'classnames/bind'

let cx = classNames.bind(sty)

export default class DropDown extends Component {
  static propTypes = {
    links: PropTypes.array.isRequired
  }

  state = {
    toggleState: false
  }

  render() {
    const { links } = this.props
    let dropDown = cx({
      dropDown: this.state.toggleState === false,
      dropDownOpen: this.state.toggleState === true
    })
    return (
      <div className={sty.container}>
        <div className={sty.header} onClick={this.handleClick}>
          <p>Portfolio</p>
          {this.state.toggleState === false ? <FaAngleDown /> : <FaAngleUp />}
        </div>
        <div className={dropDown}>
          {links.map((link, index) =>
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

