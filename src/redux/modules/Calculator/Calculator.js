import { createAction, handleActions } from 'redux-actions'

/**
 * Constants
 */

export const CALC_BUTTON_CLICK = 'CALC_BUTTON_CLICK'

/**
 * Actions
 */

export const calcButtonClick = createAction(CALC_BUTTON_CLICK, value => value)

export const actions = {
  calcButtonClick
}

/**
 * Reducer
 */

var initialState = {
  number: 0,
  variable: 'x',
  expressions: [],
  answer: 'test'
}

export const Calculator = handleActions({
  CALC_BUTTON_CLICK: (state, {payload}) => Object.assign({}, state, {
    answer: state.answer.concat(payload)
  })
}, initialState)