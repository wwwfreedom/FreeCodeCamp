import {random} from 'lodash'
import { createAction } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const USER_GUESS_SET = 'USER_GUESS_SET'
export const RESET = 'RESET'
export const TILE_ORDER_SET = 'TILE_ORDER_SET'
export const TILE_TRIGGER = 'TILE_TRIGGER'

// ------------------------------------
// Actions
// ------------------------------------

export const userGuessSet = createAction(USER_GUESS_SET, color => color)
export const reset = createAction(RESET)
export const tileOrderSet = createAction(TILE_ORDER_SET, color => color)
export const tileTrigger = createAction(TILE_TRIGGER, tile => tile)

// ------------------------------------
// Thunk Actions
// ------------------------------------

export const start = () => (dispatch, getState) => {
  const random = random(0, 3)
  const arr = ['blue', 'blue', 'green', 'red', 'yellow']

  arr.forEach((item, index) => {
    setTimeout(() => {
      dispatch(tileTrigger(item))
      setTimeout(() => {
        dispatch(tileTrigger('blank'))
      }, 300)
    }, (index * 700))
  })
}

export const actions = {
  userGuessSet,
  reset,
  start
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [USER_GUESS_SET]: (state, action) => ({
    ...state,
    userGuess: [ ...state.userGuess, action.payload ]
  }),

  [TILE_ORDER_SET]: (state, action) => ({
    ...state,
    tileOrder: [ ...state.tileOrder, action.payload ]
  }),

  [TILE_TRIGGER]: (state, action) => ({
    ...state,
    tileTrigger: action.payload
  }),

  [RESET]: () => INITIAL_STATE
}

// ------------------------------------
// Reducer
// ------------------------------------

const INITIAL_STATE = {
  tileOrder: [],
  userGuess: [],
  isGuessing: false,
  score: 0,
  tileTrigger: ''
}

export default function TicTacToe(state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}