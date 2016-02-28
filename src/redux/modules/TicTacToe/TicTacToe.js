import { createAction } from 'redux-actions'

var computerMove = 0

// fastest clone implementation http://jsperf.com/deep-cloning-of-objects
function deepClone(obj) {
  var i, ret, ret2
  if (typeof obj === "object") {
    if (obj === null) return obj
    if (Object.prototype.toString.call(obj) === "[object Array]") {
      ret = []
      for (i = 0; i < obj.length; i++) {
        if (typeof obj[i] === "object") {
          ret2 = deepClone(obj[i])
        } else {
          ret2 = obj[i]
        }
        ret.push(ret2)
      }
    } else {
      ret = {}
      for (i in obj) {
        if (obj.hasOwnProperty(i)) {
          if (typeof (obj[i] === "object")) {
            ret2 = deepClone(obj[i])
          } else {
            ret2 = obj[i]
          }
          ret[i] = ret2
        }
      }
    }
  } else {
    ret = obj
  }
  return ret
}

function availableMoves(stateCopy) {
  let moves = []
  stateCopy.tiles.forEach(function(cell, i) {
    if (cell === '') {
      moves.push(i)
    }
  })
  return moves
}

function simulatedMove(move, simStateCopy) {
  let simstate = simStateCopy
  simstate.tiles[move] = simstate.turn
  simstate.turn = simstate.turn === 'x' ? 'o' : 'x'
  simstate.winner = checkBoard(simstate)[0]
  return simstate
}

function minimax(_stateCopy) {
  let stateCopy = deepClone(_stateCopy)
  // terminal states to end the recursion
  if (stateCopy.winner === 'x') {
    return 1
  } else if (stateCopy.winner === 'o') {
    return -1
  } else if (stateCopy.winner === 'd') {
    return 0
  } else {
    let moves = availableMoves(stateCopy)
    let scores = moves.map(move => {
      // for each move return to current board configuration ??
      stateCopy = deepClone(_stateCopy)
      let simulatedGame = simulatedMove(move, stateCopy)
      // recursion.  simulatedGame until terminal state is reached for all moves.
      return minimax(simulatedGame)
    })
    let maxScore = Math.max.apply(null, scores)
    let minScore = Math.min.apply(null, scores)

    // return stateCopy to initial current state
    stateCopy = deepClone(_stateCopy)
    if (stateCopy.turn === 'x') {
      computerMove = moves[scores.indexOf(maxScore)]
      return maxScore
    } else if (stateCopy.turn === 'o') {
      computerMove = moves[scores.indexOf(minScore)]
      return minScore
    } else {
      throw new Error('Cannot minimax invalid player: ')
    }
  }
}

/**
 * check array of string for possible win condition m
 * @param  {array} t array of x or o or '' reflecting the board state
 * @return {string}   a string character denoting the result of check
 */
function checkBoard(state) {
  let t = state.tiles
  // using regex join the strings in board to see if it matchs the pattern
  let check = (a, b, c) => !!(a + b + c).match(/^(xxx|ooo)$/gi)
  // if match one of the win condition then return the value of the match either as x or o
  if (check(t[0], t[1], t[2])) return [t[0], 0, 1, 2]
  if (check(t[3], t[4], t[5])) return [t[3], 3, 4, 5]
  if (check(t[6], t[7], t[8])) return [t[6], 6, 7, 8]

  if (check(t[0], t[3], t[6])) return [t[0], 0, 3, 6]
  if (check(t[1], t[4], t[7])) return [t[1], 1, 4, 7]
  if (check(t[2], t[5], t[8])) return [t[2], 2, 5, 8]

  if (check(t[0], t[4], t[8])) return [t[0], 0, 4, 8]
  if (check(t[2], t[4], t[6])) return [t[2], 2, 4, 6]

  // if no match the string length of the array will be nice in which case return d as a draw
  if (t.join('').length === 9) return ['d']
  return ['n']
}

// ------------------------------------
// Constants
// ------------------------------------

export const TILE_SET = 'TILE_SET'
export const PLAYER_TYPE_SET = 'PLAYER_TYPE_SET'
export const GAME_STATUS_SET = 'GAME_STATUS_SET'
export const TURN_SET = 'TURN_SET'
export const WINNER_SET = 'WINNER_SET'
export const GAME_SOFT_RESET = 'GAME_SOFT_RESET'
export const GAME_HARD_RESET = 'GAME_HARD_RESET'
export const WINNING_COMBO_SET = 'WINNING_COMBO_SET'
export const STAT_SET = 'STAT_SET'

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
export const statSet = createAction(STAT_SET, stat => stat)
// reset only tiles and previous winner
export const gameSoftReset = createAction(GAME_SOFT_RESET)
export const gameHardReset = createAction(GAME_HARD_RESET)
export const winningComboSet = createAction(WINNING_COMBO_SET, position => position)

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
    dispatch(winnerSet(checkBoard(getState().TicTacToe)[0]))

    // game's finish when winner is not equal to 'n' this is to continue the game
    if (getState().TicTacToe.winner !== 'n') {
      console.log('this will only run if I win')
      dispatch(updateStat())
      setTimeout(() => {
        dispatch(gameSoftReset())
        dispatch(tileSet(Math.floor(Math.random() * (9)), computer))
        dispatch(turnSet(player))
      }, 1000)
    }

    // only initiate AI minimax if it is needed ?
    if (getState().TicTacToe.turn === getState().TicTacToe.computer && getState().TicTacToe.winner === 'n') {
      // using setTimeout here because minimax is a heavy function so I don't want to block the dispatches above. This force the function below to run after all the functions above finises.
      setTimeout(() => {
        // create a copy of the current board to work with using Object.assign doesn't work here for come reason
        // lesson: This is another way to clone an object but avoid using if there's function in the properties of the object then use lodash deepClone
        let stateCopy = deepClone(getState().TicTacToe)
        // lesson: using performance to measure time it takes to execute a function
        // let t0 = performance.now()
        minimax(stateCopy)
        // let t1 = performance.now()
        // consoe.log("Call to minimax took " + (t1 - t0) + " milliseconds.")
        dispatch(tileSet(computerMove, computer))
        dispatch(turnSet(player))
        dispatch(winnerSet(checkBoard(getState().TicTacToe)[0]))
        // game's finish when winner is not equal to 'n'
        if (getState().TicTacToe.winner !== 'n') {
          if (getState().TicTacToe.winner !== 'd') {
            // lesson: learn to use rest parameter with destructuring
            const [first, ...rest] = checkBoard(getState().TicTacToe)
            console.log(first)
            dispatch(winningComboSet(rest))
          }
          dispatch(updateStat())
          // ToAsk: How to cancel this this timeOut in another dispatch like hardReset dispatch
          setTimeout(() => {
            dispatch(gameSoftReset())
            dispatch(tileSet(Math.floor(Math.random() * (9)), computer))
            dispatch(turnSet(player))
          }, 1000)
        }
      }, 0)
    }
  }
}

export const updateStat = () => (dispatch, getState) => {
  const {winner, computer, player} = getState().TicTacToe
  console.log(winner, computer, player)
    // report the stats
  if (winner === computer) {
    dispatch(statSet('computer'))
  }

  if (winner === player) {
    dispatch(statSet('player'))
  }

  if (winner === 'd') {
    dispatch(statSet('ties'))
  }
}

export const actions = {
  tileSetIfValid,
  playerTypeSet,
  tileSet,
  gameHardReset,
  gameSoftReset,
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

  [GAME_SOFT_RESET]: (state, action) => ({
    ...state,
    tiles: ['', '', '', '', '', '', '', '', ''],
    winner: 'n',
    winningCombo: []
  }),

  [GAME_HARD_RESET]: (state, action) => INITIAL_STATE,

  [WINNER_SET]: (state, action) => Object.assign({}, state, {
    winner: action.payload
  }),

  [WINNING_COMBO_SET]: (state, action) => ({
    ...state,
    winningCombo: action.payload
  }),

  [STAT_SET]: (state, action) => ({
    ...state,
    stats: {
      ...state.stats,
      [action.payload]: state.stats[action.payload] + 1
    }
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
  status: 'inActive',
  winningCombo: [],
  stats: {
    computer: 0,
    player: 0,
    ties: 0
  }
}

export default function TicTacToe(state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}