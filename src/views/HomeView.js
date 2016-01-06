import { connect } from 'react-redux'
import React, { Component } from 'react'
import sty from './HomeView.scss'
import { actions as homeViewActions } from '../redux/modules/homeView.js'
import Header from 'components/Header/Header'

const mapStateToProps = (state) => ({
  headerImage: state.homeView.headerImage,
  headerText: state.homeView.headerText,
  headerParagraph: state.homeView.headerParagraph
})
export class HomeView extends Component {
  static propTypes = {
    headerImage: React.PropTypes.string.isRequired,
    headerText: React.PropTypes.string.isRequired,
    headerParagraph: React.PropTypes.string.isRequired
  }
  render() {
    const { headerImage, headerText, headerParagraph } = this.props
    return (
      <div className={sty.container}>
        <Header
          headerText={headerText}
          headerImage={headerImage}
          headerParagraph={headerParagraph}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, homeViewActions)(HomeView)