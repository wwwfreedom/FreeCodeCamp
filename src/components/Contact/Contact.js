import React, { Component, PropTypes } from 'react'

import sty from './Contact.scss'

export default class Contact extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired,
    contactNameSet: PropTypes.func.isRequired,
    contactEmailSet: PropTypes.func.isRequired,
    contactMessageSet: PropTypes.func.isRequired
  }
  state = {
    name: this.props.contact.formInput.name || '',
    email: this.props.contact.formInput.email || '',
    message: this.props.contact.formInput.message || ''
  }
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
            <form onSubmit={(e) => this.handleSubmit(e)}>
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
              <input
                type="submit"
                value="Send"
              />
            </form>
          </div>
          <div className={sty.links}>

          </div>
        </div>
      </div>
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleBlur = (e, type) => {
    if (type === 'name') {
      this.props.contactNameSet(this.state.name)
    }

    if (type === 'email') {
      this.props.contactEmailSet(this.state.email)
    }

    if (type === 'message') {
      this.props.contactMessageSet(this.state.message)
    }
  }

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
  }
}