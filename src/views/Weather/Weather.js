import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as WeatherActions } from 'redux/modules/Weather/Weather.js'
import sty from './Weather.scss'

const mapStateToProps = (state) => ({
  location: state.Weather.location
})

export default class Weather extends Component {
  static propTypes = {
    location: PropTypes.object,
    locationReceive: PropTypes.func.isRequired,
    locationRequest: PropTypes.func.isRequired,
    locationError: PropTypes.func.isRequired
  };

  render() {
    const { location } = this.props
    return (
      <div className={sty.container}>
        {location.longitude}
        {location.latitude}
        {location.error.message}
      </div>
    )
  }

  componentDidMount() {
    const { locationReceive, locationRequest, locationError } = this.props
    // if geolocation is available
    if ("geolocation" in window.navigator) {
      locationRequest(true)
      const geoSuccess = (position) => {
        locationReceive({latitude: position.coords.latitude, longitude: position.coords.longitude})
        locationRequest(false)
      }
      const geoError = (error) => {
        console.log(error)
        locationError(error)
      }
      const geoOptions = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
      }

      window.navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions)

    } else {
      window.alert("This browser does not support geolocation")
      return
    }
  }
}

export default connect(mapStateToProps, WeatherActions)(Weather)
