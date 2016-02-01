import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { actions as aboutViewActions } from '../../src/redux/modules/aboutView.js'
import Section from 'components/Section/Section'
import Header from 'components/Header/Header'
import sty from './AboutView.scss'

const mapStateToProps = (state) => ({
  title: state.aboutView.about.title,
  introText: state.aboutView.about.introText,
  image: state.aboutView.image
})

export class AboutView extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    introText: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  };

  render () {
    const { introText, image } = this.props
    return (
      <div className={sty.container}>
        <Header
          headerText="I'm Kevin"
          headerImage={image}
          separator={false}
        />
        <Section
          title='Bonjour'
          text={introText}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, aboutViewActions)(AboutView)
