// original source http://khan.github.io/react-components/#info-tip
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames/bind'
import sty from './ButtonGroup.scss'

let cx = classNames.bind(sty)

export default class ButtonGroup extends Component {
  static propTypes = {
    value: PropTypes.any,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any.isRequired,
      content: PropTypes.node,
      title: PropTypes.string
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    allowEmpty: PropTypes.bool
  };

  state = {
    value: null,
    allowEmpty: true
  };

  render() {
    const {buttons, value} = this.props
    var arrOfButtons = buttons.map((button, i) => {
      let buttonStyle = cx({
        button: button.value !== value,
        buttonActive: button.value === value
      })
      return <button title={button.title}
              type="button"
              id={"" + i}
              ref={"button" + i}
              key={"" + i}
              className={buttonStyle}
              onClick={this.toggleSelect.bind(this, button.value)}>
          {button.content || "" + button.value}
      </button>
    })
    return (
      <div className={sty.container}>
        {arrOfButtons}
      </div>
    )
  }

  // focus = () => {
  //   ReactDOM.findDOMNode(this).focus()
  //   return true
  // };

  toggleSelect = (newValue) => {
    var value = this.props.value

    if (this.props.allowEmpty) {
      // Select the new button or unselect if it's already selected
      this.props.onChange(value !== newValue ? newValue : null)
    } else {
      this.props.onChange(newValue)
    }
  }
}