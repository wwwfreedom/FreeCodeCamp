import React, { Component } from 'react'

export default class DetectScroll extends Component {
  static propTypes = {
    onWindowScroll: React.PropTypes.func.isRequired,
    children: React.PropTypes.element.isRequired
  }
  render() {
    return this.props.children
  }
  handleScroll = function(event) {
    // Do something generic, if you have to
    console.log("ScrollWrapper's handleScroll")

    // Call the passed-in prop
    if (this.props.onWindowScroll) this.props.onWindowScroll(event)
  }
  componentDidMount() {
    if (this.props.onWindowScroll) window.addEventListener("click", this.handleScroll)
  }

  componentWillUnmount() {
    if (this.props.onWindowScroll) window.removeEventListener("click", this.handleScroll)
  }
}

