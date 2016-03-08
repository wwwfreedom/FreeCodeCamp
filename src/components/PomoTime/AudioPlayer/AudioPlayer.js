/**
 * https://gist.github.com/gaearon/830490fc17d3fccc88c9
 * Inspiration and apdatation from code in the link above
 */

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

export default class AudioPlayer extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    defaultTime: PropTypes.number,
    // onProgress: PropTypes.func.isRequired,
    // onTimeUpdate: PropTypes.func.isRequired,
    onEnd: PropTypes.func.isRequired
  };

  render() {
    return (
      <audio preload='none'>
        <source src={this.props.source}
                type='audio/mpeg' />
      </audio>
    )
  }

  /**
   * start of react life cycle functions
   */

  componentDidMount() {
    var node = ReactDOM.findDOMNode(this)

    // node.addEventListener('progress', this.handleProgress)
    // node.addEventListener('timeupdate', this.handleTimeUpdate)
    node.addEventListener('ended', this.handleMediaEnd)

    this.updateIsPlaying()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.source !== this.props.source) {
      this.updateSource()
    }

    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.updateIsPlaying()
    }

    if (prevProps.defaultTime !== this.props.defaultTime) {
      this.updateCurrentTime()
    }
  }

  componentWillUnmount() {
    var node = ReactDOM.findDOMNode(this)

    // node.removeEventListener('progress', this.handleProgress)
    // node.removeEventListener('timeupdate', this.handleTimeUpdate)
    node.removeEventListener('ended', this.handleMediaEnd)
  }

  /**
   * Start of custom logic functions
   */

  // handleTimeUpdate = () => {
  //   var node = ReactDOM.findDOMNode(this)
  //   var currentTime = node.currentTime
  //   var trackDuration = node.duration

  //   this.props.onTimeUpdate({
  //     currentTime: currentTime,
  //     trackDuration: trackDuration
  //   })
  // }

  handleMediaEnd = () => {
    ReactDOM.findDOMNode(this).currentTime = 0
    this.props.onEnd()
  };

  // handleProgress = () => {
  //   var node = ReactDOM.findDOMNode(this)
  //   var trackDuration = node.duration
  //   var buffered = node.buffered

  //   this.props.onProgress({
  //     trackDuration: trackDuration,
  //     buffered: buffered
  //   })
  // }

  updateCurrentTime = () => {
    var node = ReactDOM.findDOMNode(this)
    if (node.readyState) {
      node.currentTime = this.props.defaultTime
    }
  };

  updateIsPlaying = () => {
    var node = ReactDOM.findDOMNode(this)
    var isPlaying = this.props.isPlaying

    if (isPlaying) {
      node.play()
    } else {
      node.pause()
    }
  };

  updateSource = () => {
    var node = ReactDOM.findDOMNode(this)
    var isPlaying = this.props.isPlaying

    node.pause()
    // this.props.onTimeUpdate({
    //   currentTime: 0,
    //   trackDuration: node.duration
    // })

    node.load()
    if (isPlaying) {
      node.play()
    }
  };
}