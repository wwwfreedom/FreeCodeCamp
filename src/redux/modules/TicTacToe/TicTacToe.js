// import {isEmpty, includes, flatMap} from 'lodash'
import { createAction } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------

export const TILE_SET = 'TILE_SET'
export const PLAYER_TYPE_SET = 'PLAYER_TYPE_SET'
export const GAME_STATUS_SET = 'GAME_STATUS_SET'
export const TURN_SET = 'TURN_SET'
export const WINNER_SET = 'WINNER_SET'
export const GAME_SOFT_RESET = 'GAME_SOFT_RESET'
export const GAME_STATE_SET = 'GAME_STATE_SET'

// ------------------------------------
// Actions
// ------------------------------------

// LESSON: you can use es6 object destructuring to omit the properties if they are the same name as the value
export const tileSet = (position, type) => ({
  type: TILE_SET,
  payload: {
    position, // without es6 destructuring it would be position: position
    type
  }
})

export const playerTypeSet = (type) => ({
  type: PLAYER_TYPE_SET,
  payload: type
})

export const gameStatusSet = createAction(GAME_STATUS_SET, status => status)

export const turnSet = createAction(TURN_SET, player => player)

export const winnerSet = createAction(WINNER_SET, player => player)

export const gameStateSet = createAction(GAME_STATE_SET, state => state)

// ------------------------------------
// Thunk Actions
// ------------------------------------

export const tileSetIfValid = (position) => (dispatch, getState) => {
  const { player, tiles, winner, computer } = getState().TicTacToe
  // If the selected position is already filled or player haven't choose a type, return to prevent it being replaced.
  if ( (tiles[position] === 'x' || tiles[position] === 'o') || (winner !== 'n') || player === '' ) {
    return
  } else {
    dispatch(tileSet(position, player))
    dispatch(turnSet(computer))
    // checkboard if there's a winner if not then set winner to either n or d for draw
    dispatch(winnerSet(checkBoard(getState().TicTacToe.tiles)))
  }
  // // // if human hasn't chose a type then return (exit the function)
  // // if (isEmpty(player)) return
  // // if human turn
  // if (turn === 'human' && tileType === 'blank') {
  //   // only set tile if it's blank otherwise return
  //   dispatch(tileSet(position, player, false))
  //   // switch over to computer
  //   dispatch(turnSet('computer'))
  //   dispatch(checkBoard())
  // }
  // // if computer turn
  // if (turn === 'computer' && tileType === 'blank') {
  //   let type
  //   if (player === 'X') {
  //     type = 'O'
  //   } else {
  //     type = 'X'
  //   }
  //   dispatch(tileSet(position, type, false))
  //   dispatch(turnSet('human'))
  //   dispatch(checkBoard())
  // }
}

/**
 * check array of string for possible win condition m
 * @param  {array} t array of x or o or '' reflecting the board state
 * @return {string}   a string character denoting the result of check
 */
function checkBoard(t) {
  // using regex join the strings in board to see if it matchs the pattern
  let check = (a, b, c) => !!(a + b + c).match(/^(xxx|ooo)$/gi)
  // if match one of the win condition then return the value of the match either as x or o
  if (check(t[0], t[1], t[2])) return t[0]
  if (check(t[3], t[4], t[5])) return t[3]
  if (check(t[6], t[7], t[8])) return t[6]

  if (check(t[0], t[3], t[6])) return t[0]
  if (check(t[1], t[4], t[7])) return t[1]
  if (check(t[2], t[5], t[8])) return t[2]

  if (check(t[0], t[4], t[8])) return t[0]
  if (check(t[2], t[4], t[6])) return t[2]

  // if no match the string length of the array will be nice in which case return d as a draw
  if (t.join('').length === 9) return 'd'
  return 'n'
}

// export const checkBoard = () => (dispatch, getState) => {
//   const { winState, gameState, player } = getState().TicTacToe
//   // return array of gamestate tile objects with the relevant tile type
//   let xState = gameState.filter(tile => tile.type === 'X')
//   let oState = gameState.filter(tile => tile.type === 'O')
//   // loop through the winState array of winning positions
//   let xWinTest = winState.map(winningTiles => {
//     // loop through the winning combination postion and compare the gameState position
//     let x = winningTiles.map(position => {
//       return includes(flatMap(xState, tile => tile.position), position)
//     })
//     // if winning position match the winning position of the current winState position then
//     if (includes(x, false)) {
//       return false
//     } else {
//       return true
//     }
//   })

//   let oWinTest = winState.map(winningTiles => {
//     let o = winningTiles.map(position => {
//       return includes(flatMap(oState, tile => tile.position), position)
//     })
//     if (includes(o, false)) {
//       return false
//     } else {
//       return true
//     }
//   })

//   // if there's three consecutive true in x's then
//   if (includes(xWinTest, true)) {
//     // for each of the winning tile set the win state to true which will change the background of winning tiles
//     winState[xWinTest.indexOf(true)].map((position) => {
//       dispatch(tileSet(position, 'X', true))
//     })
//     if (player === 'X') {
//       dispatch(winnerSet('human'))
//       dispatch(gameStatusSet('won'))
//       // delay the reset by 3 seconds.
//       setTimeout(() => { dispatch(gameSoftReset()) }, 1500)
//     } else {
//       dispatch(winnerSet('computer'))
//       dispatch(gameStatusSet('won'))
//       setTimeout(() => { dispatch(gameSoftReset()) }, 1500)
//     }
//   }
//   // if there's three consecutive true in o's then
//   if (includes(oWinTest, true)) {
//     winState[oWinTest.indexOf(true)].map((position) => {
//       dispatch(tileSet(position, 'O', true))
//     })
//     if (player === 'O') {
//       dispatch(winnerSet('human'))
//       dispatch(gameStatusSet('won'))
//       setTimeout(() => { dispatch(gameSoftReset()) }, 1500)
//     } else {
//       dispatch(winnerSet('computer'))
//       dispatch(gameStatusSet('won'))
//       setTimeout(() => { dispatch(gameSoftReset()) }, 1500)
//     }
//   }
// }

// reset everything except for previous winner
export const gameSoftReset = () => (dispatch, getState) => {
  // default back to human begin plays
  dispatch(turnSet('human'))
  dispatch(gameStateSet([]))
  // dispatch(boardInitIfNeeded())
  dispatch(gameStatusSet('active'))
}

export const actions = {
  tileSetIfValid,
  // boardInitIfNeeded,
  playerTypeSet,
  gameStatusSet
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  // using es7 object spread notation instead of es6 Object.assign()
  // Lesson: I learnt to remove and add a new item to an array object while keeping the index order intact using es6 spread operator. refer to this link for more info https://egghead.io/lessons/javascript-redux-avoiding-array-mutations-with-concat-slice-and-spread
  [TILE_SET]: (state, action) => ({
    ...state,
    tiles: [
      ...state.tiles.slice(0, action.payload.position),
      action.payload.type,
      ...state.tiles.slice(action.payload.position + 1)
    ]
  }),

  [PLAYER_TYPE_SET]: (state, action) => Object.assign({}, state, {
    player: action.payload.player,
    computer: action.payload.computer
  }),

  [GAME_STATUS_SET]: (state, action) => Object.assign({}, state, {
    status: action.payload
  }),

  [TURN_SET]: (state, action) => Object.assign({}, state, {
    turn: action.payload
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

const INITIAL_STATE = {
  tiles: [
    '', '', '',
    '', '', '',
    '', '', ''
  ],
  player: '',
  computer: '',
  // Noughts always go first
  turn: 'x',
  // n = no winner, d = draw, if there's winner then it would be x or o
  winner: 'n',
  status: 'inActive'
}

export default function TicTacToe(state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}