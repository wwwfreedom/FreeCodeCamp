// // import { createAction, handleActions } from 'redux-actions'

// /**
//  * Constants
//  */

// // export const NOTIF_SEND = 'NOTIF_SEND'
// // export const NOTIF_DISMISS = 'NOTIF_DISMISS'
// // export const NOTIF_CLEAR = 'NOTIF_CLEAR'

// /**
//  * Actions
//  */

// // // Dismiss a notification by the given id.
// // export const notifDismiss = createAction(NOTIF_DISMISS, id => id)
// // // Send a notif with notif payload
// // export const notifSend = createAction(NOTIF_SEND, notif => notif)
// // // Clear all notifications
// // export const notifClear = createAction(NOTIF_CLEAR)

// /**
//  * Publish a notification,
//  * - if `dismissAfter` was set, the notification will be auto dismissed after the given period.
//  * - if id wasn't specified, a time based id will be generated.
//  */
// // export const notifShouldSend = (notif) => {
// //   if (!notif.id) {
// //     notif.id = new Date().getTime()
// //   }
// //   return dispatch => {
// //     dispatch(notifSend(notif))

// //     if (notif.dismissAfter) {
// //       setTimeout(() => { dispatch(notifDismiss(notif.id)) }, notif.dismissAfter)
// //     }
// //   }
// // }

// // export const actions = {
// //   notifShouldSend,
// //   notifClear,
// //   notifDismiss
// // }

// /**
//  * Reducer
//  */

// // const initialState = []

// export const NOTIF_SEND = 'NOTIF_SEND'
// export const NOTIF_DISMISS = 'NOTIF_DISMISS'
// export const NOTIF_CLEAR = 'NOTIF_CLEAR'

// /**
//  * Publish a notification,
//  * - if `dismissAfter` was set, the notification will be auto dismissed after the given period.
//  * - if id wasn't specified, a time based id will be generated.
//  */
// // export function notifSend(notif) {
// //   if (!notif.id) {
// //     notif.id = new Date().getTime()
// //   }
// //   console.log('being called')
// //   return dispatch => {
// //     dispatch({ type: NOTIF_SEND, payload: notif })

// //     if (notif.dismissAfter) {
// //       setTimeout(() => { dispatch({ type: NOTIF_DISMISS, payload: notif.id}) }, notif.dismissAfter)
// //     }
// //   }
// // }

// export const notifSend = (notif) => {
//   if (!notif.id) {
//     notif.id = new Date().getTime()
//   }
//   console.log('being called')
//   return dispatch => {
//     dispatch({ type: NOTIF_SEND, payload: notif })

//     if (notif.dismissAfter) {
//       setTimeout(() => { dispatch({type: NOTIF_DISMISS, payload: notif.id}) }, notif.dismissAfter)
//     }
//   }
// }

// /**
//  * Dismiss a notification by the given id.
//  */
// export const notifDismiss = (id) => {
//   return { type: NOTIF_DISMISS, payload: id }
// }

// /**
//  * Clear all notifications
//  */
// export const notifClear = () => {
//   return { type: NOTIF_CLEAR }
// }

// export default function notifs(domain = [], action) {
//   if (!action || !action.type) return domain

//   switch (action.type) {
//     case NOTIF_SEND:
//       return [action.payload, ...domain]
//     case NOTIF_DISMISS:
//       return domain.filter(notif =>
//           notif.id !== action.payload
//       )
//     case NOTIF_CLEAR:
//       return []
//     default:
//       return domain
//   }
// }

// // export const Notification = handleActions({
// //   NOTIF_SEND: (state, {payload}) => [...state, payload],
// //   NOTIF_DISMISS: (state, {payload}) => {
// //     state.filter(notif => {
// //       return notif.id !== payload.id
// //     })
// //   },
// //   NOTIF_CLEAR: (state) => []
// // }, initialState)

// // export default Notification