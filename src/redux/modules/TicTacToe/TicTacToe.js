import {isEmpty, includes, flatMap} from 'lodash'
import { createAction } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------

export const TILE_SET = 'TILE_SET'
export const BOARD_INIT = 'BOARD_INIT'
export const PLAYER_TYPE_SET = 'PLAYER_TYPE_SET'
export const GAME_STATUS_SET = 'GAME_STATUS_SET'
export const CURRENT_PLAYER_SET = 'CURRENT_PLAYER_SET'
export const WINNER_SET = 'WINNER_SET'
export const GAME_SOFT_RESET = 'GAME_SOFT_RESET'
export const GAME_STATE_SET = 'GAME_STATE_SET'

// ------------------------------------
// Actions
// ------------------------------------

export const tileSet = (position, type, win) => ({
  type: TILE_SET,
  payload: {
    position: position,
    type: type,
    win: win
  }
})

export const playerTypeSet = (type) => ({
  type: PLAYER_TYPE_SET,
  payload: type
})

export const gameStatusSet = createAction(GAME_STATUS_SET, status => status)

// LESSON: you can use es6 object destructuring to omit the properties if they are the same name as the value
export const boardInit = createAction(BOARD_INIT, (position, type, win) => ({
  position, // without es6 destructuring it would be position: position
  type, // type: type
  win
}))

export const currentPlayerSet = createAction(CURRENT_PLAYER_SET, player => player)

export const winnerSet = createAction(WINNER_SET, player => player)

export const gameStateSet = createAction(GAME_STATE_SET, state => state)

// ------------------------------------
// Thunk Actions
// ------------------------------------

export const boardInitIfNeeded = () => (dispatch, getState) => {
  if (getState().TicTacToe.gameState.length === 9) {
    return
  }

  for (var i = 0; i < 9; i++) {
    dispatch(boardInit(i, 'blank', false))
  }
}

export const tileSetIfValid = (position) => (dispatch, getState) => {
  const { humanType, currentTurn } = getState().TicTacToe
  // the current type of the tile
  let tileType = getState().TicTacToe.gameState[position].type
  // if human hasn't chose a type then return (exit the function)
  if (isEmpty(humanType)) return
  // if human turn
  if (currentTurn === 'human' && tileType === 'blank') {
    // only set tile if it's blank otherwise return
    dispatch(tileSet(position, humanType, false))
    // switch over to computer
    dispatch(currentPlayerSet('computer'))
    dispatch(checkWinningState())
  }
  // if computer turn
  if (currentTurn === 'computer' && tileType === 'blank') {
    let type
    if (humanType === 'X') {
      type = 'O'
    } else {
      type = 'X'
    }
    dispatch(tileSet(position, type, false))
    dispatch(currentPlayerSet('human'))
    dispatch(checkWinningState())
  }
}

export const checkWinningState = () => (dispatch, getState) => {
  const { winState, gameState, humanType } = getState().TicTacToe
  // return array of gamestate tile objects with the relevant tile type
  let xState = gameState.filter(tile => tile.type === 'X')
  let oState = gameState.filter(tile => tile.type === 'O')
  // loop through the winState array of winning positions
  let xWinTest = winState.map(winningTiles => {
    // loop through the winning combination postion and compare the gameState position
    let x = winningTiles.map(position => {
      return includes(flatMap(xState, tile => tile.position), position)
    })
    // if winning position match the winning position of the current winState position then
    if (includes(x, false)) {
      return false
    } else {
      return true
    }
  })

  let oWinTest = winState.map(winningTiles => {
    let o = winningTiles.map(position => {
      return includes(flatMap(oState, tile => tile.position), position)
    })
    if (includes(o, false)) {
      return false
    } else {
      return true
    }
  })

  // if there's three consecutive true in x's then
  if (includes(xWinTest, true)) {
    // for each of the winning tile set the win state to true which will change the background of winning tiles
    winState[xWinTest.indexOf(true)].map((position) => {
      dispatch(tileSet(position, 'X', true))
    })
    if (humanType === 'X') {
      dispatch(winnerSet('human'))
      dispatch(gameStatusSet('won'))
      // delay the reset by 3 seconds.
      setTimeout(() => { dispatch(gameSoftReset()) }, 1500)
    } else {
      dispatch(winnerSet('computer'))
      dispatch(gameStatusSet('won'))
      setTimeout(() => { dispatch(gameSoftReset()) }, 1500)
    }
  }
  // if there's three consecutive true in o's then
  if (includes(oWinTest, true)) {
    winState[oWinTest.indexOf(true)].map((position) => {
      dispatch(tileSet(position, 'O', true))
    })
    if (humanType === 'O') {
      dispatch(winnerSet('human'))
      dispatch(gameStatusSet('won'))
      setTimeout(() => { dispatch(gameSoftReset()) }, 1500)
    } else {
      dispatch(winnerSet('computer'))
      dispatch(gameStatusSet('won'))
      setTimeout(() => { dispatch(gameSoftReset()) }, 1500)
    }
  }
}

// reset everything except for previous winner
export const gameSoftReset = () => (dispatch, getState) => {
  // default back to human begin plays
  dispatch(currentPlayerSet('human'))
  dispatch(gameStateSet([]))
  dispatch(boardInitIfNeeded())
  dispatch(gameStatusSet('active'))
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
        type: action.payload.type,
        win: action.payload.win
      },
      ...state.gameState.slice(action.payload.position + 1)
    ]
  }),

  [PLAYER_TYPE_SET]: (state, action) => Object.assign({}, state, {
    humanType: action.payload
  }),

  [GAME_STATUS_SET]: (state, action) => Object.assign({}, state, {
    status: action.payload
  }),

  [CURRENT_PLAYER_SET]: (state, action) => Object.assign({}, state, {
    currentTurn: action.payload
  }),

  [GAME_STATE_SET]: (state, action) => Object.assign({}, state, {
    gameState: action.payload
  }),

  [WINNER_SET]: (state, action) => Object.assign({}, state, {
    winner: action.payload
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  currentTurn: 'human',
  status: 'inActive',
  winner: '',
  humanType: '',
  score: 0,
  winState: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  gameState: []
}

export default function TicTacToe(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}