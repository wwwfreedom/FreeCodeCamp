import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

/**
 * A single notification component
 */
export default class Notification extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
     // The message kind to render, this affects the styling of the notification.
    kind: PropTypes.oneOf(['success', 'info', 'warning', 'danger']).isRequired,
     // The given text will be rendered as a button within the notification
    action: PropTypes.string,
    onClick: PropTypes.func,
     // * A handler to be invoked when the action recieves a click event.
    onActionClick: PropTypes.func,
     // The time in milliseconds that the notification will automatically dismiss after
    dismissAfter: PropTypes.number,
     // * A handler to be invoked upon notification dismiss
    onDismis: PropTypes.func,
    theme: PropTypes.shape({
      defaultClasses: PropTypes.string,
      successClasses: PropTypes.string,
      infoClasses: PropTypes.string,
      warningClasses: PropTypes.string,
      dangerClasses: PropTypes.string
    }),
    CustomComponent: PropTypes.element
  };

  static defaultProps = {
    kind: 'info'
  };

  constructor() {
    super()
    this._id = new Date().getTime()
    this._onActionClick = this._onActionClick.bind(this)
  }

  /*
   * Handle action click event
   * @description Handle click events on the
   */
  _onActionClick = (event) => {
    event.preventDefault()
    if (this.props.onClick) {
      this.props.onActionClick()
    } else {
      return
    }
  };

  render() {
    const { theme, kind, CustomComponent, action } = this.props

    let classes
    let styles = {}
    if (!theme) {
      const stylesPerType = stylesNotif[kind]
      styles = {
        ...stylesNotif.base,
        ...stylesPerType
      }
    } else {
      classes = classnames('re-notif', theme.defaultClasses, theme[`${kind}Classes`])
    }

    const component = !CustomComponent
      ? <div className={classes} style={styles}>
        <div>
          <div className="notif-icon"/>
          <div className="notif-content">
            <span className="notif-message">{this.props.message}</span>
          </div>
          { action &&
            <span className="notif-action">
              <button onClick={this._onActionClick}>{this.props.action}</button>
            </span>
          }
          <div className="notif-close"/>
        </div>
      </div>
      : <CustomComponent {...this.props}/>

    return component
  }
}

const stylesNotif = {
  base: {
    position: 'relative',
    font: '1rem normal Helvetica, sans-serif',
    overflow: 'hidden',
    'borderRadius': 0,
    'marginBottom': 8,
    'maxHeight': 400,
    boxSizing: 'border-box',
    boxShadow: [ '0 3px 6px 0px rgba(0, 0, 0, .16)', '0 3px 6px rgba(0, 0, 0, 0.23)' ],
    padding: '0.5rem',
    color: '#fff'
  },

  success: {
    backgroundColor: '#64ce83'
  },

  info: {
    backgroundColor: '#3ea2ff'
  },

  warning: {
    backgroundColor: '#ff7f48'
  },

  danger: {
    backgroundColor: '#e74c3c'
  }
}
