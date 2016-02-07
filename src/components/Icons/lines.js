import React, { Component } from 'react'
import IconBase from './base.js'

export default class Lines extends Component {
  render() {
    return (
      <IconBase viewBox="-3 0 40 40" {...this.props}>
        <g>
        <path fill="#444" d="M7 10h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM25 12h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1h18c0.552 0 1-0.448 1-1s-0.448-1-1-1zM25 16h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1h18c0.552 0 1-0.448 1-1s-0.448-1-1-1zM25 20h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1h18c0.552 0 1-0.448 1-1s-0.448-1-1-1z"/>
        </g>
      </IconBase>
    )
  }
}
