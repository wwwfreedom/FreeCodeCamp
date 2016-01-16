import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import sty from './HomeView.scss'
import { actions as homeViewActions } from '../redux/modules/homeView.js'
import Header from 'components/Header/Header'
import Portfolio from 'components/Portfolio/Portfolio'
import Contact from 'components/Contact/Contact'
import Footer from 'components/Footer/Footer'

const mapStateToProps = (state) => ({
  headerImage: state.homeView.headerImage,
  headerText: state.homeView.headerText,
  headerParagraph: state.homeView.headerParagraph,
  aboutSectionTitle: state.homeView.section.about.title,
  aboutSectionText: state.homeView.section.about.text,
  portfolio: state.homeView.portfolio,
  contact: state.homeView.contact
})

export class HomeView extends Component {
  static propTypes = {
    headerImage: React.PropTypes.string.isRequired,
    headerText: React.PropTypes.string.isRequired,
    headerParagraph: React.PropTypes.string.isRequired,
    portfolio: React.PropTypes.array.isRequired,
    contact: React.PropTypes.object.isRequired,
    contactNameSet: PropTypes.func.isRequired,
    contactEmailSet: PropTypes.func.isRequired,
    contactMessageSet: PropTypes.func.isRequired,
    contactFormSubmit: PropTypes.func.isRequired
  }

  render() {
    const { headerImage, headerText, headerParagraph, portfolio, contact, contactNameSet, contactEmailSet, contactMessageSet, contactFormSubmit } = this.props
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
        <Contact
          contact={contact}
          contactNameSet={contactNameSet}
          contactEmailSet={contactEmailSet}
          contactMessageSet={contactMessageSet}
          contactFormSubmit={contactFormSubmit}
        />
        <Footer />
      </div>
    )
  }
}

export default connect(mapStateToProps, homeViewActions)(HomeView)