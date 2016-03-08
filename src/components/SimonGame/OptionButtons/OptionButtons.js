import React, { Component, PropTypes } from 'react'
import sty from './OptionButtons.scss'
import RaisedButton from 'material-ui/lib/raised-button'
import Toggle from 'material-ui/lib/toggle'

const style = {
  margin: '1em',
  toggle: {
    margin: '0.5em auto',
    width: '150px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    padding: '0.5em'
  }
}

export default class OptionButtons extends Component {
  static propTypes = {
    a: PropTypes.string,
    reset: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
    hardModeSet: PropTypes.func.isRequired,
    toggleState: PropTypes.bool.isRequired
  };

  render() {
    const {reset, start, hardModeSet, toggleState} = this.props
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
        <Toggle
          label='Hard Mode'
          style={style.toggle}
          labelPosition="right"
          defaultToggled={toggleState}
          // Lesson: with checked input you use target.checked to determine the toggle state
          onToggle={(e) => hardModeSet(e.target.checked)}
        />
      </div>
    )
  };
}
