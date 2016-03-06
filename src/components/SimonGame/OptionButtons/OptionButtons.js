import React, { Component, PropTypes } from 'react'
import sty from './OptionButtons.scss'
import RaisedButton from 'material-ui/lib/raised-button'

const style = {
  margin: '1em'
}

export default class OptionButtons extends Component {
  static propTypes = {
    a: PropTypes.string,
    reset: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired
  };

  render() {
    const {reset, start} = this.props
    return (
      <div className={sty.container}>
        <RaisedButton
          label='Start'
          style={style}
          // lesson: when you don't state anything primary in this case is assume to have a value of true and absence of primary is false
          primary
          onClick={start}
        />
        <RaisedButton
          label='Reset'
          style={style}
          secondary
          onClick={reset}
          />
        <RaisedButton label='Hard mode' style={style}/>
      </div>
    )
  }
}
