import {random, isEqual} from 'lodash'
import { createAction } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const USER_GUESS_SET = 'USER_GUESS_SET'
export const USER_GUESS_CLEAR = 'USER_GUESS_CLEAR'
export const RESET = 'RESET'
export const GUESS_STATUS_SET = 'GUESS_STATUS_SET'
export const TILE_ORDER_SET = 'TILE_ORDER_SET'
export const TILE_TRIGGER = 'TILE_TRIGGER'
export const ANIMATION_SET = 'ANIMATION_SET'
export const GAME_STATUS_SET = 'GAME_STATUS_SET'
export const WRONG_SET = 'WRONG_SET'
export const SCORE_INC = 'SCORE_INC'

// ------------------------------------
// Actions
// ------------------------------------

export const userGuessSet = createAction(USER_GUESS_SET, color => color)
export const userGuessClear = createAction(USER_GUESS_CLEAR)
export const reset = createAction(RESET)
export const guessStatusSet = createAction(GUESS_STATUS_SET, state => state)
export const tileOrderSet = createAction(TILE_ORDER_SET, color => color)
export const tileTrigger = createAction(TILE_TRIGGER, tile => tile)
export const animationSet = createAction(ANIMATION_SET, state => state)
export const gameStatusSet = createAction(GAME_STATUS_SET, state => state)
export const wrongSet = createAction(WRONG_SET, state => state)
export const scoreInc = createAction(SCORE_INC)

// ------------------------------------
// Thunk Actions
// ------------------------------------
const colors = ['blue', 'red', 'yellow', 'green']

export const start = () => (dispatch, getState) => {
  // only dispatch when the gameStatus is inActive
  if (getState().SimonGame.gameStatus === 'inActive') {
    dispatch(tileOrderSet(colors[random(0, 3)]))
    dispatch(animateTiles())
    dispatch(scoreInc())
    dispatch(gameStatusSet('active'))
  }
}

export const animateTiles = () => (dispatch, getState) => {
  // set animation on
  dispatch(animationSet(true))

  // loop through generated tilesOrder and trigger the tiles
  const tilesOrder = getState().SimonGame.tilesOrder
  tilesOrder.forEach((item, index) => {
    setTimeout(() => {
      dispatch(tileTrigger(item))
      setTimeout(() => {
        dispatch(tileTrigger('blank'))
      }, 300)
    }, (index * 700))
  })

  // toAsk is there a better way to ensure the order of async action dispatch instead of using setTimeout, mb promise or generator or async await
  // set animation state to false after animation is finish
  setTimeout(() => {
    dispatch(animationSet(false))
  }, tilesOrder.length * 700)
}

export const userInput = (color) => (dispatch, getState) => {
  const {animating, gameStatus, isGuessing} = getState().SimonGame
  // ignore user input when the game is animating
  if (animating === false && gameStatus === 'active') {
    // clear the user's guess after every round
    if (isGuessing === false) {
      dispatch(guessStatusSet(true))
      dispatch(userGuessSet(color))
      dispatch(wrongSet(''))
      // check to see if the user's guess matchs the computer generated tilesOrder
      const {tilesOrder, userGuess} = getState().SimonGame

      if (isEqual(tilesOrder, userGuess)) {
        dispatch(wrongSet('false'))
        setTimeout(() => {
          // set wrong state back to empty
          dispatch(wrongSet(''))
          dispatch(scoreInc())
          dispatch(tileOrderSet(colors[random(0, 3)]))
          dispatch(animateTiles())
          dispatch(guessStatusSet(false))
          dispatch(userGuessClear())
        }, 1000)
      } else {
        // if the user guess exceeds the computer generated sequence then reset and clear user's guess and toggle wrong state
        if (getState().SimonGame.userGuess.length >= getState().SimonGame.tilesOrder.length) {
          dispatch(wrongSet('true'))
          dispatch(userGuessClear())
          setTimeout(() => { dispatch(wrongSet('')) }, 1000 )
        }
        console.log('wrong')
      }
    } else {
      dispatch(userGuessSet(color))
      dispatch(wrongSet(''))
      // check to see if the user's guess matchs the computer generated tilesOrder
      const {tilesOrder, userGuess} = getState().SimonGame

      if (isEqual(tilesOrder, userGuess)) {
        dispatch(wrongSet('false'))
        setTimeout(() => {
          dispatch(wrongSet(''))
          dispatch(scoreInc())
          dispatch(tileOrderSet(colors[random(0, 3)]))
          dispatch(animateTiles())
          dispatch(guessStatusSet(false))
          dispatch(userGuessClear())
        }, 1000)
      } else {
        // if the user guess exceeds the computer generated sequence then reset and clear user's guess
        if (getState().SimonGame.userGuess.length >= getState().SimonGame.tilesOrder.length) {
          dispatch(wrongSet('true'))
          dispatch(userGuessClear())
          setTimeout(() => { dispatch(wrongSet('')) }, 1000 )
        }
        console.log('wrong')
      }
    }
  }
}

export const actions = {
  userInput,
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

  [USER_GUESS_CLEAR]: (state) => ({
    ...state,
    userGuess: []
  }),

  [WRONG_SET]: (state, action) => ({
    ...state,
    isWrong: action.payload
  }),

  [SCORE_INC]: (state, action) => ({
    ...state,
    score: state.score + 1
  }),

  [GAME_STATUS_SET]: (state, action) => ({
    ...state,
    gameStatus: action.payload
  }),

  [ANIMATION_SET]: (state, action) => ({
    ...state,
    animating: action.payload
  }),

  [TILE_ORDER_SET]: (state, action) => ({
    ...state,
    tilesOrder: [ ...state.tilesOrder, action.payload ]
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
  gameStatus: 'inActive',
  tilesOrder: [],
  userGuess: [],
  isWrong: '',
  isGuessing: false,
  animating: false,
  score: 0,
  tileTrigger: ''
}

export default function TicTacToe(state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}