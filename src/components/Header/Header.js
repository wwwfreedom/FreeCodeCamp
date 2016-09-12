import React, { Component, PropTypes} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'
import sty from './Header.scss'

export default class Header extends Component {
  static propTypes = {
    headerImage: React.PropTypes.string.isRequired,
    headerText: React.PropTypes.string.isRequired,
    headerParagraph: React.PropTypes.string,
    separator: PropTypes.bool
  };

  render() {
    return (
      <div className={sty.container}>
        <div className={sty.content}>
          <h1 style={{display: 'none'}}>Kevin Truong</h1>
          <h2>Ideas, Code, Deploy <br/> Specializing in responsive <br/> interactive web apps</h2>
          <h3>Full-stack Javascript Developer</h3>
        </div>
        <div className={sty.cta}>
          <Link to='/about'>
            <RaisedButton label='What I offer'></RaisedButton>
          </Link>
          <Link to='/portfolio'>
            <RaisedButton label='My work experience'></RaisedButton>
          </Link>
        </div>
      </div>
    )
  }
}
