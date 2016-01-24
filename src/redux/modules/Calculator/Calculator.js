import { createAction, handleActions } from 'redux-actions'

/**
 * Constants
 */

export const CALC_BUTTON_CLICK = 'CALC_BUTTON_CLICK'
export const CALC_CLEAR = 'CALC_CLEAR'

/**
 * Actions
 */

export const calcButtonClick = createAction(CALC_BUTTON_CLICK, value => value)
export const calcClear = createAction(CALC_CLEAR)

export const actions = {
  calcButtonClick,
  calcClear
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
  }),

  CALC_CLEAR: (state) => Object.assign({}, state, {
    answer: ''
  })
}, initialState)