import React, { Component } from 'react'
import MenuBar from '../../components/MenuBar/MenuBar.js'
import SideBar from '../../components/SideBar/SideBar.js'

export default class Navigation extends Component {
  state = {
    mobileNavIsOpen: false
  }
  render() {
    return (
      <div>
        <SideBar
          mobileNavIsOpen={this.state.mobileNavIsOpen}
          toggleMenu={this.toggleMenu}
        />
        <MenuBar
          mobileNavIsOpen={this.state.mobileNavIsOpen}
          toggleMenu={this.toggleMenu}
        />
      </div>
    )
  }
  toggleMenu = () => {
    this.setState({
      mobileNavIsOpen: !this.state.mobileNavIsOpen
    })
  }
}
