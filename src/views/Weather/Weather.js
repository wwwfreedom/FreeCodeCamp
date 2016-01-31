import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as WeatherActions } from 'redux/modules/Weather/Weather.js'
import sty from './Weather.scss'

const mapStateToProps = (state) => ({
  location: state.Weather.location
})

export default class Weather extends Component {
  static propTypes = {
    location: PropTypes.string
  }
  render() {
    const { location } = this.props
    return (
      <div className={sty.container}>
        {location}
      </div>
    )
  }
}

export default connect(mapStateToProps, WeatherActions)(Weather)
