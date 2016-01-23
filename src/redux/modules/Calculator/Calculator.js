import { createAction, handleActions } from 'redux-actions'

/**
 * Constants
 */

/**
 * Actions
 */


export const actions = {

}

/**
 * Reducer
 */

var initialState = {
  number: 0,
  variable: 'x',
  expressions: []
}

export const Calculator = handleActions({

}, initialState)