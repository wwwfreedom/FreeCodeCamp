import {random, isEqual} from 'lodash'
import { createAction } from 'redux-actions'

// increase the animation speed as round number increased
// show win when user get to round 20 and restart

// ------------------------------------
// Constants
// ------------------------------------
export const USER_GUESS_SET = 'USER_GUESS_SET'
export const USER_GUESS_CLEAR = 'USER_GUESS_CLEAR'
export const RESET = 'RESET'
export const GUESS_STATUS_SET = 'GUESS_STATUS_SET'
export const TILE_ORDER_SET = 'TILE_ORDER_SET'
export const TILE_ORDER_CLEAR = 'TILE_ORDER_CLEAR'
export const TILE_TRIGGER = 'TILE_TRIGGER'
export const ANIMATION_SET = 'ANIMATION_SET'
export const GAME_STATUS_SET = 'GAME_STATUS_SET'
export const WRONG_SET = 'WRONG_SET'
export const SCORE_INC = 'SCORE_INC'
export const SCORE_SET = 'SCORE_SET'
export const HARD_MODE_SET = 'HARD_MODE_SET'
export const TILE_SOUND_PLAY_ON = 'TILE_SOUND_PLAY_ON'
export const TILE_SOUND_PLAY_OFF = 'TILE_SOUND_PLAY_OFF'

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
export const hardModeSet = createAction(HARD_MODE_SET, state => state)
export const tileOrderClear = createAction(TILE_ORDER_CLEAR)
export const scoreSet = createAction(SCORE_SET, score => score)
export const tileSoundPlayOn = createAction(TILE_SOUND_PLAY_ON, color => color)
export const tileSoundPlayOff = createAction(TILE_SOUND_PLAY_OFF)

// ------------------------------------
// Thunk Actions
// ------------------------------------
const colors = ['blue', 'red', 'yellow', 'green']
var tileAnimation = []
var tileBlankAnimation = []
var animationFalse

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
    tileAnimation[index] = setTimeout(() => {
      dispatch(tileTrigger(item))
      tileBlankAnimation[index] = setTimeout(() => {
        dispatch(tileTrigger('blank'))
      }, 500)
    }, (index * 1000))
  })

  // toAsk is there a better way to ensure the order of async action dispatch instead of using setTimeout, mb promise or generator or async await
  // set animation state to false after animation is finish
  animationFalse = setTimeout(() => {
    dispatch(animationSet(false))
  }, tilesOrder.length * 1000)
}

// handler for user tile inputs
export const userInput = (color) => (dispatch, getState) => {
  const {animating, gameStatus, isGuessing} = getState().SimonGame
  // ignore user input when the game is animating
  if (animating === false && gameStatus === 'active') {
    // use isGuessing state to only clear the user input upon unsuccesful matching check. Effect is to avoid premature clearing of user input
    if (isGuessing === false) {
      dispatch(guessStatusSet(true))
      dispatch(userGuessSet(color))
      dispatch(wrongSet(''))
      dispatch(check())
    } else {
      dispatch(userGuessSet(color))
      dispatch(wrongSet(''))
      dispatch(check())
    }
  }
}

// check to see if the user's guess matchs the computer generated tilesOrder
export const check = () => (dispatch, getState) => {
  const {tilesOrder, userGuess, score} = getState().SimonGame
  if (isEqual(tilesOrder, userGuess)) {
    if (score >= 20) {
      dispatch(gameStatusSet('won'))
      setTimeout(() => {
        dispatch(reset())
      }, 2500)
      return
    }
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
    const {hardMode, userGuess, tilesOrder} = getState().SimonGame
    if (hardMode === true && userGuess.length >= tilesOrder.length) {
      dispatch(wrongSet('true'))
      dispatch(userGuessClear())
      setTimeout(() => {
        dispatch(wrongSet(''))
        dispatch(tileOrderClear())
        // set the score back to round 1
        dispatch(scoreSet(1))
        dispatch(tileOrderSet(colors[random(0, 3)]))
        dispatch(animateTiles())
        return
      }, 1000 )
    }
    // if the user guess exceeds the computer generated sequence then reset and clear user's guess and toggle wrong state
    if (userGuess.length >= tilesOrder.length) {
      dispatch(wrongSet('true'))
      dispatch(userGuessClear())
      setTimeout(() => {
        dispatch(wrongSet(''))
        dispatch(animateTiles())
      }, 1000 )
    }
  }
}

export const handleReset = () => (dispatch, getState) => {
  // lesson: need to clearTimeOut to stop callback
  tileAnimation.forEach(animationId => clearTimeout(animationId))
  tileBlankAnimation.forEach(animationId => clearTimeout(animationId))
  clearTimeout(animationFalse)
  dispatch(reset())
}

export const actions = {
  userInput,
  handleReset,
  start,
  hardModeSet,
  tileSoundPlayOn,
  tileSoundPlayOff
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

  [TILE_ORDER_CLEAR]: (state) => ({
    ...state,
    tilesOrder: []
  }),

  [SCORE_SET]: (state, action) => ({
    ...state,
    score: action.payload
  }),

  [TILE_TRIGGER]: (state, action) => ({
    ...state,
    tileTrigger: action.payload
  }),

  [HARD_MODE_SET]: (state, action) => ({
    ...state,
    hardMode: action.payload
  }),

  [TILE_SOUND_PLAY_ON]: (state, action) => ({
    ...state,
    tileSoundPlaying: action.payload
  }),

  [TILE_SOUND_PLAY_OFF]: (state, action) => ({
    ...state,
    tileSoundPlaying: false
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
  tileTrigger: '',
  tileSoundPlaying: '',
  hardMode: false
}

export default function TicTacToe(state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}