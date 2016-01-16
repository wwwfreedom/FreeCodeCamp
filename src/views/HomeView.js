import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import sty from './HomeView.scss'
import { actions as homeViewActions } from '../redux/modules/homeView.js'
import Header from 'components/Header/Header'
import Portfolio from 'components/Portfolio/Portfolio'

const mapStateToProps = (state) => ({
  headerImage: state.homeView.headerImage,
  headerText: state.homeView.headerText,
  headerParagraph: state.homeView.headerParagraph,
  portfolio: state.homeView.portfolio
})

export class HomeView extends Component {
  static propTypes = {
    headerImage: PropTypes.string.isRequired,
    headerText: PropTypes.string.isRequired,
    headerParagraph: PropTypes.string.isRequired,
    portfolio: PropTypes.array.isRequired
  }

  render() {
    const { headerImage, headerText, headerParagraph, portfolio } = this.props
    const separator = true
    return (
      <div className={sty.container}>
        <Header
          headerText={headerText}
          headerImage={headerImage}
          headerParagraph={headerParagraph}
          separator={separator}
        />
        <Portfolio
          portfolio={portfolio}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, homeViewActions)(HomeView)