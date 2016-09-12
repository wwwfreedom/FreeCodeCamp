import React from 'react'
import sty from './Footer.scss'

export default function Footer () {
  return (
    <div className={sty.container}>
      <p>
        Built using React.js. Check out the source
        <a href="https://github.com/wwwfreedom/FreeCodeCamp" target='_blank'> here. </a>
         &copy; {new Date().getFullYear()}
      </p>
    </div>
  )
}
