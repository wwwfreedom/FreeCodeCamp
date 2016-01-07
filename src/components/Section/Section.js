import React, { Component } from 'react'
import sty from './Section.scss'

export default class Section extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired
  }
  render() {
    const { text, title } = this.props
    return (
      <div className={sty.container}>
        <div className={sty.title}>{title}</div>
        <div className={sty.separator}>
          <div className={sty.lineSeparator}>∎</div>
        </div>
        <div className={sty.text}> {text} </div>
      </div>
    )
  }
}
