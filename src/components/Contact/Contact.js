import React from 'react'
import sty from './Contact.scss'

export default function Contact ({contact}) {
  return (
    <div className={sty.container}>
      <div className={sty.map}>Get in touch</div>
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
