import React from 'react'
import sty from './Contact.scss'

export default function Contact ({contact}) {
  var style = {
    backgroundImage: `url('${contact.map}')`
  }
  return (
    <div className={sty.container}>
      <div className={sty.map} style={style}><h2>Get in touch</h2></div>
      <div className={sty.content}>
        <div className={sty.form}>
          <h3>Shoot me a message</h3>
          <form>
            <input type="text" placeholder={contact.formInput.namePlaceholder}/>
            <input type="email" placeholder={contact.formInput.emailPlaceholder}/>
            <textarea cols="10" rows="4" placeholder={contact.formInput.messagePlaceholder}></textarea>
            <input type="submit" value="Send"/>
          </form>
        </div>
        <div className={sty.links}>

        </div>
      </div>
    </div>
  )
}

Contact.propTypes = {
  contact: React.PropTypes.object.isRequired
}
