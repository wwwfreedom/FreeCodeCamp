import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as WeatherActions } from 'redux/modules/Weather/Weather.js'
import sty from './Weather.scss'
import IconDisplay from 'components/Weather/IconDisplay.js'
import TempDisplay from 'components/Weather/TempDisplay.js'

import { notifSend } from 'redux/modules/Notification/actions/notifs.js'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const mapStateToProps = (state) => ({
  location: state.Weather.location,
  weather: state.Weather.weather
})

const combineActions = Object.assign({}, WeatherActions, {
  notifSend
})

export default class Weather extends Component {
  static propTypes = {
    location: PropTypes.object,
    locationReceive: PropTypes.func.isRequired,
    locationRequest: PropTypes.func.isRequired,
    locationError: PropTypes.func.isRequired,
    notifSend: PropTypes.func.isRequired,
    fetchWeatherIfNeeded: PropTypes.func.isRequired,
    weather: PropTypes.object.isRequired
  };

  state = {
    unit: 'deg',
    temp: this.props.weather.stat.main.temp
  };

  render() {
    const { weather } = this.props
    return (
      <div className={sty.container}>
        <div className={sty.nameTemp}>
          <TempDisplay
            temp={this.state.temp}
            unit={this.state.unit}
            onClick={this.handleClick}
          />
          <div className={sty.cityName}>
            {weather.stat.name}
          </div>
        </div>
        <div className={sty.statwrap}>
          <IconDisplay code={weather.stat.weather[0].id}/>
          <div className={sty.description}>
            {capitalizeFirstLetter(weather.stat.weather[0].description)}
          </div>
        </div>
      </div>
    )
  }

  handleClick = () => {
    if (this.state.unit === 'deg') {
      this.setState({
        unit: 'fah',
        temp: Math.round((this.state.temp * 1.8 + 32) * 10 ) / 10
      })
    } else {
      this.setState({
        unit: 'deg',
        temp: Math.round(((this.state.temp - 32) / 1.8) * 10 ) / 10
      })
    }
  };

// lesson: if using redux to keep the state then you will need to force the component to set the state and force re-render on change of props otherwise it won't be reflected in the ui
  componentWillReceiveProps(nextProps) {
    this.setState({
      temp: nextProps.weather.stat.main.temp
    })
  }

  componentDidMount() {
    const { locationReceive, locationRequest, locationError, notifSend, fetchWeatherIfNeeded } = this.props

    // if geolocation is available
    if ("geolocation" in window.navigator) {
      locationRequest(true)
      const geoSuccess = (position) => {
        locationReceive({latitude: position.coords.latitude, longitude: position.coords.longitude})
        locationRequest(false)
        // then fetch weather
        fetchWeatherIfNeeded()
      }
      // if there's error fire appropriate notification
      const geoError = (error) => {
        locationError(error)
        if (error.code === 1) {
          notifSend({
            message: 'Sorry can not get the weather for you. Try to refresh the page and accept our location request.',
            kind: 'danger',
            dismissAfter: 5000
          })
        } else if (error.code === 2) {
          notifSend({
            message: 'Sorry can not get the weather for you because we can not determine your location. Refresh the page and make sure to turn on your wifi or gps',
            kind: 'danger',
            dismissAfter: 5000
          })
        } else {
          notifSend({
            message: 'Sorry can not get the weather for you. It is taking unusually long to determine your location. Try again to refresh the page and make sure to turn on your wifi or gps',
            kind: 'danger',
            dismissAfter: 8000
          })
        }
      }
      const geoOptions = {
        enableHighAccuracy: false,
        maximumAge: 30000,
        timeout: 27000
      }

      window.navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions)
    } else {
      notifSend({
        message: 'Sorry can not get the weather for you because we can not determine your location. Please upgrade your browser',
        kind: 'danger',
        dismissAfter: 7000
      })
      window.alert("This browser does not support geolocation")
      return
    }
  }
}

export default connect(mapStateToProps, combineActions)(Weather)