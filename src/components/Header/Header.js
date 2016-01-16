import React, { Component, PropTypes} from 'react'
import sty from './Header.scss'

export default class Header extends Component {
  static propTypes = {
    headerImage: React.PropTypes.string.isRequired,
    headerText: React.PropTypes.string.isRequired,
    headerParagraph: React.PropTypes.string.isRequired,
    separator: PropTypes.bool,
    height: PropTypes.number
  }
  render() {
    const { headerImage, headerText, headerParagraph } = this.props
    var style = {
      backgroundImage: `url('${headerImage}')`
    }
    return (
      <div className={sty.container}>
        <div className={sty.bgImage} style={style}>
          <div className={sty.content}>
            <h1>{headerText}</h1>
            <div className={sty.separator}>
              <div className={sty.lineSeparator}>∎</div>
            </div>
            <p>{headerParagraph}</p>
          </div>
        </div>
        <div className={sty.bgPattern}></div>
      </div>
    )
  }
}