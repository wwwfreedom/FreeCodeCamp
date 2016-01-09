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
