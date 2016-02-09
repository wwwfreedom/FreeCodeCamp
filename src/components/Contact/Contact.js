import React, { Component, PropTypes } from 'react'
import FaGitHub from 'react-icons/lib/fa/github'
import FaCodepen from 'react-icons/lib/fa/codepen'

import sty from './Contact.scss'
import fcc from '../../static/images/fcc.svg'

export default class Contact extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired,
    contactNameSet: PropTypes.func.isRequired,
    contactEmailSet: PropTypes.func.isRequired,
    contactMessageSet: PropTypes.func.isRequired,
    contactFormSubmit: PropTypes.func.isRequired
  };

  state = {
    name: this.props.contact.formInput.name,
    email: this.props.contact.formInput.email,
    message: this.props.contact.formInput.message
  };

  render() {
    const { contact } = this.props
    var style = {
      backgroundImage: `url('${contact.map}')`
    }
    return (
      <div className={sty.container}>
        <div className={sty.map} style={style}><h2>Get in touch</h2></div>
        <div className={sty.content}>
          <div className={sty.form}>
            <h3>Shoot me a message</h3>
            <form className='form' ref='form' onSubmit={(e) => this.handleSubmit(e)}>
              <input
                type="text"
                required
                placeholder={contact.formInput.namePlaceholder}
                value={this.state.name}
                onBlur={(e) => this.handleBlur(e, 'name')}
                onChange={(e) => this.handleChange(e, 'name')}
              />
              <input
                type="email"
                required
                placeholder={contact.formInput.emailPlaceholder}
                value={this.state.email}
                onBlur={(e) => this.handleBlur(e, 'email')}
                onChange={(e) => this.handleChange(e, 'email')}
              />
              <textarea
                cols="10"
                rows="4"
                required
                value={this.state.message}
                onChange={(e) => this.handleChange(e, 'message')}
                onBlur={(e) => this.handleBlur(e, 'message')}
                placeholder={contact.formInput.messagePlaceholder}>
              </textarea>
              {this.renderSubmitButton()}
            </form>
          </div>
          <div className={sty.links}>
            <h3>Find Me Online</h3>
            <div className={sty.linksContent}>
              <a href={contact.github} target='_blank'>
                <div className={sty.github}>
                  <FaGitHub />
                  <h4>GitHub</h4>
                </div>
              </a>
              <a href={contact.fcc} target='_blank'>
                <div className={sty.fcc}>
                  <img src={fcc} alt="freecodecamp"/>
                  <h4>Free Code Camp</h4>
                </div>
              </a>
              <a href={contact.codepen} target='_blank'>
                <div className={sty.codepen}>
                  <FaCodepen />
                  <h4>Codepen</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderSubmitButton = () => {
    const { formStatus } = this.props.contact
    if (formStatus.submitted === false && formStatus.error === false) {
      return <input type="submit" className='submit' value="Send"/>
    } else if (formStatus.submitted === false && formStatus.error === true) {
      return <input type="text" style={{backgroundColor: '#FFBABA'}} disabled value={formStatus.response} className='submit'/>
    } else {
      return <input type="text" style={{backgroundColor: '#DFF2BF'}} disabled value={formStatus.response} className='submit'/>
    }
  };

  handleSubmit = (e) => {
    e.preventDefault()
    var payload = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    }
    this.props.contactFormSubmit(payload)
  };

  handleBlur = (e, type) => {
    if (type === 'name') {
      this.props.contactNameSet(e.target.value)
    }

    if (type === 'email') {
      this.props.contactEmailSet(e.target.value)
    }

    if (type === 'message') {
      this.props.contactMessageSet(e.target.value)
    }
  };

  handleChange = (e, type) => {
    if (type === 'name') {
      this.setState({ name: e.target.value })
    }

    if (type === 'email') {
      this.setState({ email: e.target.value })
    }

    if (type === 'message') {
      this.setState({ message: e.target.value })
    }
  };
}