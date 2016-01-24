import React, { PropTypes } from 'react'
import sty from './AnswerPanel.scss'

export default function AnswerPanel ({answer}) {
  return (
    <div className={sty.container}>
      <span>{answer}</span>
    </div>
  )
}

AnswerPanel.propTypes = {
  answer: PropTypes.string.isRequired
}