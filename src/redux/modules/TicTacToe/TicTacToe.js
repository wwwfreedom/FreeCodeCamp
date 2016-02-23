import { createAction } from 'redux-actions'
// ------------------------------------
// Constants
// ------------------------------------

export const TILE_SET = 'TILE_SET'
export const BOARD_INIT = 'BOARD_INIT'
export const PLAYER_TYPE_SET = 'PLAYER_TYPE_SET'
export const GAME_STATUS_SET = 'GAME_STATUS_SET'

// ------------------------------------
// Actions
// ------------------------------------

export const tileSet = (position, type) => ({
  type: TILE_SET,
  payload: {
    position: position,
    type: type
  }
})

export const playerTypeSet = (type) => ({
  type: PLAYER_TYPE_SET,
  payload: type
})

export const gameStatusSet = createAction(GAME_STATUS_SET, status => status)

// ------------------------------------
// Thunk Actions
// ------------------------------------

export const boardInit = () => (dispatch, getState) => {
  if (getState().TicTacToe.gameState.length === 9) {
    return
  }

  for (var i = 1; i < 10; i++) {
    dispatch(tileSet(i, ''))
  }
}

export const actions = {
  tileSet,
  boardInit,
  playerTypeSet,
  gameStatusSet
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [TILE_SET]: (state, action) => Object.assign({}, state, {
    gameState: state.gameState.concat(action.payload)
  }),

  [PLAYER_TYPE_SET]: (state, action) => Object.assign({}, state, {
    humanType: action.payload
  }),

  [GAME_STATUS_SET]: (state, action) => Object.assign({}, state, {
    status: action.payload
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  currentTurn: 'human',
  status: 'inActive',
  humanType: '',
  score: 0,
  winState: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7]
  ],
  gameState: []
}

export default function TicTacToe(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}