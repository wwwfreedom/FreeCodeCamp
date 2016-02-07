import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { actions as contactViewActions } from '../../src/redux/modules/contactView.js'
import Contact from 'components/Contact/Contact'
// import Header from 'components/Header/Header'
// import sty from './AboutView.scss'

const mapStateToProps = (state) => ({
  contact: state.contactView.contact
})

export class AboutView extends Component {
  static propTypes = {
    contact: React.PropTypes.object.isRequired,
    contactNameSet: PropTypes.func.isRequired,
    contactEmailSet: PropTypes.func.isRequired,
    contactMessageSet: PropTypes.func.isRequired,
    contactFormSubmit: PropTypes.func.isRequired
  };

  render () {
    const { contact, contactNameSet, contactEmailSet, contactMessageSet, contactFormSubmit } = this.props
    return (
      <Contact
        contact={contact}
        contactNameSet={contactNameSet}
        contactEmailSet={contactEmailSet}
        contactMessageSet={contactMessageSet}
        contactFormSubmit={contactFormSubmit}
      />
    )
  }
}

export default connect(mapStateToProps, contactViewActions)(AboutView)
