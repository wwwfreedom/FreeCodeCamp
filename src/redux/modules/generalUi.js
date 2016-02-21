import { createAction, handleActions } from 'redux-actions'

/**
 * Fixed variables
 */
export const menuLinks = ['portfolio', 'about', 'contact']

/**
 * Constants
 */

export const SIDEBAR_ACTIVATE = 'SIDEBAR_ACTIVATE'
export const MENULINKS_FETCH = 'MENULINKS_FETCH'
export const DROPDOWN_ACTIVATE = 'DROPDOWN_ACTIVATE'

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
export const menuLinksFetch = createAction(MENULINKS_FETCH)
export const dropDownActivate = createAction(DROPDOWN_ACTIVATE)

export const actions = {
  sidebarActivate,
  menuLinksFetch,
  dropDownActivate
}

/**
 * Reducer
 */
export const generalUi = handleActions({
  SIDEBAR_ACTIVATE: (state) => Object.assign({}, state, {
    sideBarStatus: !state.sideBarStatus
  }),

  MENULINKS_FETCH: (state) => Object.assign({}, state, {
    menuLinks: state.menuLinks
  }),

  DROPDOWN_ACTIVATE: (state) => Object.assign({}, state, {
    dropDownStatus: !state.dropDownStatus
  })
}, {
  // this the default state
  sideBarStatus: false,
  menuLinks: menuLinks,
  dropDownLinks: ['PomoTime', 'Quote Generator', 'Calculator', 'Weather', 'Wikipedia', 'Twitch'],
  dropDownStatus: false
})

// This is the original way of writing reducer the above is just the same thing but a nice syntax abstraction.
// export const generalUi = (state = {
//   sideBarStatus: false,
//   menuLinks: menuLinks
// }, action) => {
//   switch (action.type) {
//     case 'SIDEBAR_ACTIVATE':
//       return Object.assign({}, state, {
//         sideBarStatus: !state.sideBarStatus
//       })
//     default:
//       return state
//   }
// }

export default generalUi

