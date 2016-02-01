import React, { Component } from 'react'
import { connect } from 'react-redux'
import MenuBar from '../../components/MenuBar/MenuBar.js'
import SideBar from '../../components/SideBar/SideBar.js'
import { actions as generalUiActions } from '../../redux/modules/generalUi.js'

const mapStateToProps = (state) => ({
  mobileNavIsOpen: state.generalUi.sideBarStatus,
  menuLinks: state.generalUi.menuLinks,
  dropDownLinks: state.generalUi.dropDownLinks,
  dropDownStatus: state.generalUi.dropDownStatus,
  dropDownActivate: state.generalUi.dropDownActivate
})

export class Navigation extends Component {
  static propTypes = {
    mobileNavIsOpen: React.PropTypes.bool.isRequired,
    sidebarActivate: React.PropTypes.func.isRequired,
    menuLinks: React.PropTypes.array.isRequired,
    menuLinksFetch: React.PropTypes.func.isRequired,
    dropDownLinks: React.PropTypes.array.isRequired,
    dropDownActivate: React.PropTypes.func.isRequired,
    dropDownStatus: React.PropTypes.bool.isRequired
  };

  render() {
    return (
      <div>
        <SideBar
          mobileNavIsOpen={this.props.mobileNavIsOpen}
          toggleMenu={this.props.sidebarActivate}
          menuLinks={this.props.menuLinks}
          dropDownLinks={this.props.dropDownLinks}
          dropDownStatus={this.props.dropDownStatus}
          dropDownActivate={this.props.dropDownActivate}
        />
        <MenuBar
          mobileNavIsOpen={this.props.mobileNavIsOpen}
          toggleMenu={this.props.sidebarActivate}
          menuLinks={this.props.menuLinks}
          dropDownLinks={this.props.dropDownLinks}
          dropDownStatus={this.props.dropDownStatus}
          dropDownActivate={this.props.dropDownActivate}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, generalUiActions)(Navigation)