import { createAction, handleActions } from 'redux-actions'

/**
 * Constants
 */

export const LOCATION_REQUEST = 'LOCATION_REQUEST'
export const LOCATION_RECEIVE = 'LOCATION_RECEIVE'
export const LOCATION_ERROR = 'LOCATION_ERROR'

/**
 * Actions
 */

export const locationReceive = createAction(LOCATION_RECEIVE, location => location)
export const locationRequest = createAction(LOCATION_REQUEST, status => status)
export const locationError = createAction(LOCATION_ERROR, error => error)

export const actions = {
  locationRequest,
  locationReceive,
  locationError
}

/**
 * Reducer
 */

const initialState = {
  location: {
    longitude: '',
    latitude: '',
    requestStatus: false,
    error: {
      status: false,
      message: ''
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
  })
}, initialState)

export default Weather

