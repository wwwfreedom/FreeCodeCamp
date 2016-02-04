export const NOTIF_SEND = 'NOTIF_SEND'
export const NOTIF_DISMISS = 'NOTIF_DISMISS'
export const NOTIF_CLEAR = 'NOTIF_CLEAR'

/**
 * Dismiss a notification by the given id.
 */
export const notifDismiss = (id) => {
  return { type: NOTIF_DISMISS, payload: id }
}

/**
 * Clear all notifications
 */
export const notifClear = () => {
  return { type: NOTIF_CLEAR }
}

/**
 * Publish a notification,
 * - if `dismissAfter` was set, the notification will be auto dismissed after the given period.
 * - if id wasn't specified, a time based id will be generated.
 */
export const notifSend = (notif) => {
  if (!notif.id) {
    notif.id = new Date().getTime()
  }
  return dispatch => {
    dispatch({ type: NOTIF_SEND, payload: notif })
    // can't dispatch an object directly had to call the notifDismiss
    if (notif.dismissAfter) {
      setTimeout(() => { dispatch(notifDismiss(notif.id)) }, notif.dismissAfter)
    }
  }
}

