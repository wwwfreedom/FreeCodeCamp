import React, { Component, PropTypes } from 'react'
import sty from './AboutView.scss'
import FaHtml5 from 'react-icons/lib/fa/html5'
import FaCode from 'react-icons/lib/fa/code'
import FaMobile from 'react-icons/lib/fa/mobile'
import FaWrench from 'react-icons/lib/fa/wrench'
import FaDiamond from 'react-icons/lib/fa/diamond'
import FaServer from 'react-icons/lib/fa/server'
import FaDatabase from 'react-icons/lib/fa/database'
import FaTerminal from 'react-icons/lib/fa/terminal'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'

export class AboutView extends Component {
  static propTypes = {
    size: PropTypes.object.isRequired // from HOC SizeMe
  };

  render () {
    return (
      <div className={sty.container}>
        <div className={sty.innerContainer}>
          <div className={sty.offer}>
            <h1>About</h1>
            <h2>What I offer</h2>
            <p>
              I specialize in <b>Front-End/Javascript Development</b>, with a strong emphasis on usability. I achieve this by leveraging open source technologies such as React.js and Redux to create a high-performance <b>single page application</b>.
            </p>
            <p>
              I believe that <em>great products</em> are made by <em>great teams</em>. I strive to grow not just as a developer but also as an adaptable productive <b>team player</b>. As a self-taught developer, I have an insatiable appetite to learn  and I believe this is what makes me excel.
            </p>
            <p>
              I've built this site up from scratch as a single page application to help showcase my skills. All the code is <a href="https://github.com/wwwfreedom/FreeCodeCamp" target='_blank'>hosted on GitHub</a> so please feel free check it out, and see how I do what I do best. It will probably give a better representation of my skills than anything I say here.
            </p>
          </div>
          <div className={sty.skillsChart}>
            <h2>Skills & Experience</h2>
            <ul>
              <li>
                <FaCode />
                <b>Front-End programming,</b>&ensp;Javascript (ES6)
              </li>
              <li>
                <FaHtml5 />
                <b>Semantic Web Design,</b>
                &ensp;HTML5 & CSS3
              </li>
              <li>
                <FaMobile />
                <b>Responsive & Mobile First Design</b>
              </li>
              <li>
                <FaWrench />
                <b>Javascripts Frameworks and libraries</b>
                <ul>
                  <li>
                    <FaCode />
                    React.js, Redux, Enzyme
                  </li>
                  <li>
                    <FaCode />
                    Moment.js, Lodash, Material-UI
                  </li>
                  <li>
                    <FaDiamond />
                    And many others...
                  </li>
                </ul>
              </li>
              <li>
                <FaServer />
                <b>Back-End programming</b>
                <ul>
                  <li>
                    <FaDatabase />
                    MongoDB, RethinkDb, PostgreSQL
                  </li>
                  <li>
                    <FaCode />
                    Node.js, Express.js, Koa.js
                  </li>
                  <li>
                    <FaCode />
                    Docker, AWS
                  </li>
                </ul>
              </li>
              <li>
                <FaTerminal />
                <b>Tools</b>
                &ensp;Webpack, Babel, git,
              </li>
            </ul>
          </div>
        </div>

        <div className={sty.cta}>
          <Link to='contact'>
            <RaisedButton label='Contact Me' />
          </Link>
          <Link to='projects'>
            <RaisedButton label='My work experience' />
          </Link>
        </div>
      </div>
    )
  }
}

export default AboutView
