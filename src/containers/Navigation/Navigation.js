import React, { Component } from 'react'
import { connect } from 'react-redux'
import MenuBar from '../../components/MenuBar/MenuBar.js'
import SideBar from '../../components/SideBar/SideBar.js'
import { actions as generalUiActions } from '../../redux/modules/generalUi.js'

const mapStateToProps = (state) => ({
  mobileNavIsOpen: state.sideBarStatus
})

export class Navigation extends Component {
  static propTypes = {
    mobileNavIsOpen: React.PropTypes.bool.isRequired,
    sidebarActivate: React.PropTypes.func.isRequired
  }
  render() {
    return (
      <div>
        <SideBar
          mobileNavIsOpen={this.props.mobileNavIsOpen}
          toggleMenu={this.props.sidebarActivate}
        />
        <MenuBar
          mobileNavIsOpen={this.props.mobileNavIsOpen}
          toggleMenu={this.props.sidebarActivate}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, generalUiActions)(Navigation)