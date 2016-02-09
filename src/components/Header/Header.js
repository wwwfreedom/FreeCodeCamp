import React, { Component, PropTypes} from 'react'
import sty from './Header.scss'

export default class Header extends Component {
  static propTypes = {
    headerImage: React.PropTypes.string.isRequired,
    headerText: React.PropTypes.string.isRequired,
    headerParagraph: React.PropTypes.string,
    separator: PropTypes.bool
  };

  render() {
    const { headerImage, headerText, headerParagraph, separator } = this.props
    let style = {
      backgroundImage: `url('${headerImage}')`
    }
    return (
      <div className={sty.container}>
        <div className={sty.bgImage} style={style}>
          <div className={sty.content}>
            <h1>{headerText}</h1>
            {this.renderSeparator(separator)}
            {headerParagraph ? <p>{headerParagraph}</p> : ''}
          </div>
        </div>
        <div className={sty.bgPattern}></div>
      </div>
    )
  }

  renderSeparator = (separator) => {
    if (separator === true) {
      return (
        <div className={sty.separator}>
          <div className={sty.lineSeparator}>∎</div>
        </div>
      )
    }
  };
}