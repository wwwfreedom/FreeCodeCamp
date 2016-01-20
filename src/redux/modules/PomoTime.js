import { createAction, handleActions } from 'redux-actions'

/**
 * Constants
 */

export const COUNTDOWN_START = 'COUNTDOWN_START'
export const COUNTDOWN_PAUSE = 'COUNTDOWN_PAUSE'
export const COUNTDOWN_RESET = 'COUNTDOWN_RESET'
// export const SETTING_TOGGLE = 'SETTING_TOGGLE'
// export const ALARM_AUDIO_TOGGLE = 'ALARM_AUDIO_TOGGLE'
// export const AUTO_BREAK_TOGGLE = 'AUTO_BREAK_TOGGLE'
// export const ALARM_AUDIO_OFF = 'ALARM_AUDIO_OFF'

/**
 * Actions
 */

export const countDownStart = createAction(COUNTDOWN_START)
export const countDownPause = createAction(COUNTDOWN_PAUSE)
export const countDownReset = createAction(COUNTDOWN_RESET)

export const actions = {
  countDownStart,
  countDownPause,
  countDownReset
}

/**
 * Reducer
 */

const initialState = {
  work: {
    totalTime: 0,
    durationInMinute: 25
  },
  rest: {
    totalTime: 0,
    durationInMinute: 5,
    longRestStatus: false
  },
  distraction: {
    totalTime: 0
  },
  timer: {
    status: 'notActive',
    currentType: 'work',
    progress: 0
  },
  settings: {
    toggleStatus: false,
    alarmMute: false,
    dailyGoal: 5,
    autoBreak: false,
    alarmNotify: false
  },
  stats: {
    restCompleted: 0,
    workCompleted: 0,
    distractionOccurence: 0
  }
}

export const PomoTime = handleActions({
  COUNTDOWN_START: (state) => Object.assign({}, state, {
    timer: {
      ...state.timer,
      status: 'active'
    }
  }),

  COUNTDOWN_PAUSE: (state) => Object.assign({}, state, {
    timer: {
      ...state.timer,
      status: 'pause'
    }
  }),

  COUNTDOWN_RESET: (state) => Object.assign({}, state, {
    timer: {
      ...state.timer,
      status: 'notActive'
    }
  })
}, initialState)