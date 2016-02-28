import { isEmpty } from 'lodash'
import { createAction, handleActions } from 'redux-actions'
import fetch from 'isomorphic-fetch'
import { notifSend } from 'redux/modules/Notification/actions/notifs.js'

/**
 * Util functions
 */
// check status and will throw error if the response is not ok
export function checkStatus (response) {
  if (!response.ok) {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
  return response
}

/**
 * Constants
 */

export const LOCATION_REQUEST = 'LOCATION_REQUEST'
export const LOCATION_RECEIVE = 'LOCATION_RECEIVE'
export const LOCATION_ERROR = 'LOCATION_ERROR'

export const WEATHER_REQUEST = 'WEATHER_REQUEST'
export const WEATHER_RECEIVE = 'WEATHER_RECEIVE'
export const WEATHER_REFRESH = 'WEATHER_REFRESH'
export const WEATHER_FAILURE = 'WEATHER_FAILURE'

/**
 * Actions
 */

export const locationReceive = createAction(LOCATION_RECEIVE, location => location)
export const locationRequest = createAction(LOCATION_REQUEST, status => status)
export const locationError = createAction(LOCATION_ERROR, error => error)

export const weatherReceive = createAction(WEATHER_RECEIVE, weather => weather)
export const weatherRequest = createAction(WEATHER_REQUEST, weather => weather)
export const weatherRefresh = createAction(WEATHER_REFRESH, weather => weather)
export const weatherFailure = createAction(WEATHER_FAILURE, error => error)

/**
 * Thunk actions
 */

export const weatherFetch = () => (dispatch, getState) => {
  let latitude = getState().Weather.location.latitude
  let longitude = getState().Weather.location.longitude

  dispatch(weatherRequest(true))
  return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=ce54271e007056993cfb770137a38c09`)
    // utils function to check if there was an error in the api request
    .then(response => checkStatus(response))
    // parse response to json
    .then(response => response.json())
    // send the json in a dispatch
    .then(json => dispatch(weatherReceive(json)))
    .catch(error => {
      const response = error.response
      if (response === undefined) {
        dispatch(weatherFailure(error))
        dispatch(notifSend({
          message: "Something went wrong while trying to get your local weather.",
          kind: 'danger',
          dismissAfter: 5000
        }))
      } else {
        dispatch(weatherFailure(response))
        if (response.status === 401) {
          dispatch(notifSend({
            message: 'There is a server problem. We can not get the weather for you at this time.',
            kind: 'danger',
            dismissAfter: 5000
          }))
        } else {
          dispatch(notifSend({
            message: "Something went wrong while trying to get your local weather.",
            kind: 'danger',
            dismissAfter: 5000
          }))
        }
      }
    })
}

const shouldFetchWeather = (state) => {
  // if weather stat is empty
  if (isEmpty(state.weather.stat)) {
    return true
  }

  if (state.weather.isFetching) {
    return false
  }
  if (state.weather.didRefresh === false) {
    return true
  }
}

export const fetchWeatherIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchWeather(getState().Weather)) {
    dispatch(weatherFetch())
  }
}

export const actions = {
  locationRequest,
  locationReceive,
  locationError,
  fetchWeatherIfNeeded
}

/**
 * Reducer
 */

const initialState = {
  weather: {
    isFetching: false,
    didRefresh: false,
    lastUpdated: '',
    stat: {
      "weather": [
        {
          "id": 0,
          "main": "Clear",
          "description": "Sky is Clear"
        }
      ],
      "main": {
        "temp": 0,
        "pressure": 1012,
        "humidity": 69,
        "temp_min": 25,
        "temp_max": 25
      },
      "visibility": 10000,
      "wind": {
        "speed": 7.7,
        "deg": 220
      },
      "clouds": {
        "all": 0
      },
      "sys": {
        "type": 1,
        "id": 8204,
        "message": 0.0128,
        "country": "AU",
        "sunrise": 1454702996,
        "sunset": 1454752123
      },
      "id": 7839458,
      "name": ""
    },
    error: {}
  },
  location: {
    longitude: '',
    latitude: '',
    requestStatus: false,
    error: {
      status: false,
      message: '',
      code: ''
    }
  }
}

export const Weather = handleActions({
  LOCATION_RECEIVE: (state, {payload}) => Object.assign({}, state, {
    location: {...state.location,
      longitude: payload.longitude,
      latitude: payload.latitude
    }
  }),

  LOCATION_REQUEST: (state, {payload}) => Object.assign({}, state, {
    location: {...state.location,
      requestStatus: payload
    }
  }),

  LOCATION_ERROR: (state, {payload}) => Object.assign({}, state, {
    location: {...state.location,
      error: {
        ...state.location.error,
        status: true,
        message: payload.message,
        code: payload.code
      }
    }
  }),

  WEATHER_REQUEST: (state, {payload}) => Object.assign({}, state, {
    weather: {...state.weather,
      isFetching: payload
    }
  }),

  WEATHER_RECEIVE: (state, {payload}) => Object.assign({}, state, {
    weather: {...state.weather,
      isFetching: false,
      didRefresh: false,
      stat: payload
    }
  }),

  WEATHER_FAILURE: (state, {payload}) => Object.assign({}, state, {
    weather: {...state.weather,
      error: payload
    }
  })

}, initialState)

export default Weather

