import {isEmpty} from 'lodash'
import fetchJsonp from 'fetch-jsonp'

// ------------------------------------
// Constants
// ------------------------------------

export const TWITCH_REQUEST = 'TWITCH_REQUEST'
export const TWITCH_RECEIVE = 'TWITCH_RECEIVE'
export const TWITCH_FAILURE = 'TWITCH_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const twitchRequest = () => ({ type: TWITCH_REQUEST })
export const twitchFailure = () => ({ type: TWITCH_FAILURE })

export const twitchReceive = (values) => ({
  type: TWITCH_RECEIVE,
  payload: values
})

/**
 * Thunk actions
 */

export const twitchFetch = () => async (dispatch, getState) => {
  dispatch(twitchRequest())

  try {
    let arrayOfStreamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "comster404", "noobs2ninjas", "beohoff", "brunofin", "OgamingSC2"]

    // call api to get the details of all streamers in the array
    // lesson: using Promise.all with es7 asycn to do multiple api requests asynchronously
    // lesson: transform the object return from api in streamersDetail for this case instead of in .then return
    let streamersDetails = async function(streamers) {
      // for each streamer in the streamer array do the following api
      return await Promise.all(streamers.map(async function(streamer) {
        // api request to see if user's is currently streaming online
        let onlineStreamer = await fetchJsonp(`https://api.twitch.tv/kraken/streams/${streamer}`).then(response => response.json())

        // if user is not streameing online then do another api request to get the user channel details
        if (isEmpty(onlineStreamer.stream)) {
          // if status is 422 it means account is closed
          if (onlineStreamer.status === 422) {
            return {
              userStatus: 'Account closed',
              display_name: streamer
            }
          }
          // 2nd api call to get channel detail if user is offline
          let streamerDetails = await fetchJsonp(`https://api.twitch.tv/kraken/channels/${streamer}`).then(response => response.json())
          // transform the object return from api to include a new online property status
          return Object.assign({}, streamerDetails, {
            userStatus: 'Offline'
          })
        } else {
          return Object.assign({}, onlineStreamer.stream.channel, {
            userStatus: 'Online'
          })
        }
      }))
    }

    // once the api promise.all has resolve then dispatch the actions
    // lesson: most of the time you want to dispatch in the .then to insure that you have all the objects from the api, unless you're doing optimistic updates
    streamersDetails(arrayOfStreamers).then(values => {
      dispatch(twitchReceive(values))
    })
  } catch (error) {
    console.log(error)
    dispatch(twitchFailure())
  }
}

const shouldFetchTwitch = (state) => {
  // if is fetching
  if (state.isFetching) {
    return false
  } else {
    return true
  }
}

export const fetchTwitchIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchTwitch(getState().Twitch)) {
    dispatch(twitchFetch())
  }
}

export const actions = {
  fetchTwitchIfNeeded
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [TWITCH_REQUEST]: (state) => Object.assign({}, state, {
    isFetching: true,
    error: false
  }),

  [TWITCH_RECEIVE]: (state, action) => Object.assign({}, state, {
    isFetching: false,
    streamersDetails: action.payload
  }),

  [TWITCH_FAILURE]: (state) => Object.assign({}, state, {
    isFetching: false,
    error: true,
    streamersDetails: []
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  streamersDetails: [],
  isFetching: false,
  error: true
}

export default function Twitch(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}