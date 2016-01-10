import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import sty from './HomeView.scss'
import { actions as homeViewActions } from '../redux/modules/homeView.js'
import Header from 'components/Header/Header'
import Section from 'components/Section/Section'
import Portfolio from 'components/Portfolio/Portfolio'
import Contact from 'components/Contact/Contact'

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
    aboutSectionText: React.PropTypes.string.isRequired,
    aboutSectionTitle: React.PropTypes.string.isRequired,
    portfolio: React.PropTypes.array.isRequired,
    contact: React.PropTypes.object.isRequired,
    contactNameSet: PropTypes.func.isRequired,
    contactEmailSet: PropTypes.func.isRequired,
    contactMessageSet: PropTypes.func.isRequired
  }

  render() {
    const { headerImage, headerText, headerParagraph, aboutSectionText, aboutSectionTitle, portfolio, contact, contactNameSet, contactEmailSet, contactMessageSet } = this.props
    return (
      <div className={sty.container}>
        <Header
          headerText={headerText}
          headerImage={headerImage}
          headerParagraph={headerParagraph}
        />
        <Section
          text={aboutSectionText}
          title={aboutSectionTitle}
        />
        <Portfolio
          portfolio={portfolio}
        />
        <Contact
          contact={contact}
          contactNameSet={contactNameSet}
          contactEmailSet={contactEmailSet}
          contactMessageSet={contactMessageSet}
        />
        <div className={sty.nextDiv}></div>
      </div>
    )
  }
}

export default connect(mapStateToProps, homeViewActions)(HomeView)