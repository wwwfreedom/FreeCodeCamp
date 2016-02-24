import { createAction } from 'redux-actions'
import {isEmpty} from 'lodash'
// ------------------------------------
// Constants
// ------------------------------------

export const TILE_SET = 'TILE_SET'
export const BOARD_INIT = 'BOARD_INIT'
export const PLAYER_TYPE_SET = 'PLAYER_TYPE_SET'
export const GAME_STATUS_SET = 'GAME_STATUS_SET'
export const CURRENT_PLAYER_SET = 'CURRENT_PLAYER_SET'

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

// LESSON: you can use es6 object destructuring to omit the properties if they are the same name as the value
export const boardInit = createAction(BOARD_INIT, (position, type) => ({
  position, // without es6 destructuring it would be position: position
  type // type: type
}))

// export const tileSet = createAction(TILE_SET, (position, type) => ({position, type}))
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const boardInitIfNeeded = () => (dispatch, getState) => {
  if (getState().TicTacToe.gameState.length === 9) {
    return
  }

  for (var i = 0; i < 9; i++) {
    dispatch(boardInit(i, ''))
  }
}

export const tileSetIfValid = (position) => (dispatch, getState) => {
  if (isEmpty(getState().TicTacToe.humanType)) {
    return
  } else {
    let type = getState().TicTacToe.humanType
    dispatch(tileSet(position, type))
  }
}

export const actions = {
  tileSetIfValid,
  boardInitIfNeeded,
  playerTypeSet,
  gameStatusSet
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [BOARD_INIT]: (state, action) => Object.assign({}, state, {
    gameState: state.gameState.concat(action.payload)
  }),

  [TILE_SET]: (state, action) => Object.assign({}, state, {
    // Lesson: I learnt to remove and add a new item to an array object while keeping the index order intact using es6 spread operator. refer to this link for more info https://egghead.io/lessons/javascript-redux-avoiding-array-mutations-with-concat-slice-and-spread
    gameState: [
      ...state.gameState.slice(0, action.payload.position),
      {
        position: action.payload.position,
        type: action.payload.type
      },
      ...state.gameState.slice(action.payload.position + 1)
    ]
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