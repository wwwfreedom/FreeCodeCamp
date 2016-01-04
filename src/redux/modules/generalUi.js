import { createAction, handleActions } from 'redux-actions'

/**
 * Constants
 */

export const SIDEBAR_ACTIVATE = 'SIDEBAR_ACTIVATE'

/**
 * Actions
 */

/**
 *  * make actions in adhering to Flux Standard Action
 * @param  {string}  SIDEBAR_ACTIVATE constant
 * @param  {Boolean} (value
 * @return {object}
 */
export const sidebarActivate = createAction(SIDEBAR_ACTIVATE)

export const actions = {
  sidebarActivate
}

/**
 * Reducer
 */
export default handleActions({
  [SIDEBAR_ACTIVATE]: (state, { payload }) => !state
}, false)

// const sideBarStatus = (state = false, action) => {
//   switch (action.type) {
//     case 'SIDEBAR_ACTIVATE':
//       return !state
//     default:
//       return state
//   }
// }

// export default sideBarStatus

