import { createAction } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const USER_GUESS_SET = 'USER_GUESS_SET'
export const PLAYER_TYPE_SET = 'PLAYER_TYPE_SET'

// ------------------------------------
// Actions
// ------------------------------------

export const userGuessSet = createAction(USER_GUESS_SET, color => color)

// ------------------------------------
// Thunk Actions
// ------------------------------------

export const actions = {
  userGuessSet
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [USER_GUESS_SET]: (state, action) => ({
    ...state,
    userGuess: [ ...state.userGuess, action.payload ]
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const INITIAL_STATE = {
  tileOrder: [],
  userGuess: [],
  isGuessing: false,
  score: 0,
  reset: false
}

export default function TicTacToe(state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}