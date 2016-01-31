import { createAction, handleActions } from 'redux-actions'

/**
 * Constants
 */

export const SIDEBAR_ACTIVATE = 'SIDEBAR_ACTIVATE'

/**
 * Actions
 */

export const sidebarActivate = createAction(SIDEBAR_ACTIVATE)

export const actions = {
  sidebarActivate
}

/**
 * Reducer
 */

const initialState = {
  location: 'blah'
}

export const Weather = handleActions({
  SIDEBAR_ACTIVATE: (state) => Object.assign({}, state, {
    sideBarStatus: !state.sideBarStatus
  })
}, initialState)

export default Weather

