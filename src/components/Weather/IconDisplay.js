import React, { PropTypes } from 'react'
import sty from './IconDisplay.scss'
import Cloudy from 'components/icons/Cloudy.js'
import Sun from 'components/icons/Sun.js'
import ThunderStorm from 'components/icons/ThunderStorm.js'
import Rain from 'components/icons/Rain.js'
import Snow from 'components/icons/Snow.js'
import Lines from 'components/icons/Lines.js'

export default function IconDisplay ({code}) {
  if (code === 800) {
    return (
      <div className={sty.container}>
        <Sun />
      </div>
    )
  } else if (code >= 200 && code <= 232) {
    return (
      <div className={sty.container}>
        <ThunderStorm />
      </div>
    )
  } else if (code >= 300 && code <= 321) {
    return (
      <div className={sty.container}>
        <Rain />
      </div>
    )
  } else if (code >= 600 && code <= 622) {
    return (
      <div className={sty.container}>
        <Snow />
      </div>
    )
  } else if (code >= 801 && code <= 804) {
    return (
      <div className={sty.container}>
        <Cloudy />
      </div>
    )
  } else {
    return (
      <div className={sty.container}>
        <Lines />
      </div>
    )
  }
}

IconDisplay.propTypes = {
  code: PropTypes.number.isRequired
}
