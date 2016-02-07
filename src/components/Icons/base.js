import React from 'react'

class IconBase extends React.Component {
  render() {
    let styles = {
      verticalAlign: "middle"
      // display: 'inline-block'
    }
    var props = {
      fill: "currentColor",
      width: this.props.size,
      height: this.props.size
    }
    return (
      <svg {...props} {...this.props}
         preserveAspectRatio="xMidYMid meet" fit
         style={{...styles, ...this.props.style}} >
          {this.props.children}
      </svg>
    )
  }
}

IconBase.defaultProps = {
  size: '1em'
}

IconBase.propTypes = {
  size: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  style: React.PropTypes.object,
  children: React.PropTypes.element
}

export default IconBase
