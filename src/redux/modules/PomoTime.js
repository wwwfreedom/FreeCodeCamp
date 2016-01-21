import { createAction, handleActions } from 'redux-actions'

/**
 * Constants
 */

export const COUNTDOWN_START = 'COUNTDOWN_START'
export const COUNTDOWN_PAUSE = 'COUNTDOWN_PAUSE'
export const COUNTDOWN_RESET = 'COUNTDOWN_RESET'
export const SETTING_OPEN = 'SETTING_OPEN'
export const SETTING_CLOSE = 'SETTING_CLOSE'
export const SETTING_TOGGLE = 'SETTING_TOGGLE'
export const TIMER_PROGRESS_SET = 'TIMER_PROGRESS_SET'
export const WORK_TIME_INCREASE = 'WORK_TIME_INCREASE'
export const REST_TIME_INCREASE = 'REST_TIME_INCREASE'
export const DISTRACTION_TIME_INCREASE = 'DISTRACTION_TIME_INCREASE'
export const TIMER_TYPE_SET = 'TIMER_TYPE_SET'
export const STAT_WORK_COMPLETE_SET = 'STAT_WORK_COMPLETE_SET'
export const STAT_REST_COMPLETE_SET = 'STAT_REST_COMPLETE_SET'
export const STAT_DISTRACTION_SET = 'STAT_DISTRACTION_SET'
// export const ALARM_AUDIO_TOGGLE = 'ALARM_AUDIO_TOGGLE'
// export const AUTO_BREAK_TOGGLE = 'AUTO_BREAK_TOGGLE'
// export const ALARM_AUDIO_OFF = 'ALARM_AUDIO_OFF'

/**
 * Actions
 */

export const countDownStart = createAction(COUNTDOWN_START)
export const countDownPause = createAction(COUNTDOWN_PAUSE)
export const countDownReset = createAction(COUNTDOWN_RESET)
export const workTimeIncrease = createAction(WORK_TIME_INCREASE)
export const restTimeIncrease = createAction(REST_TIME_INCREASE)
export const distractionTimeIncrease = createAction(DISTRACTION_TIME_INCREASE)
export const settingClose = createAction(SETTING_CLOSE)
export const settingOpen = createAction(SETTING_OPEN)
export const settingToggle = createAction(SETTING_TOGGLE)
export const statWorkCompleteSet = createAction(STAT_WORK_COMPLETE_SET)
export const statRestCompleteSet = createAction(STAT_REST_COMPLETE_SET)
export const statDistractionSet = createAction(STAT_DISTRACTION_SET)
export const timerProgressSet = createAction(TIMER_PROGRESS_SET, value => value)
export const timerTypeSet = createAction(TIMER_TYPE_SET, type => type)

export const actions = {
  countDownStart,
  countDownPause,
  countDownReset,
  workTimeIncrease,
  restTimeIncrease,
  distractionTimeIncrease,
  settingClose,
  settingToggle,
  timerProgressSet,
  timerTypeSet,
  statDistractionSet,
  statRestCompleteSet,
  statWorkCompleteSet,
}

/**
 * Reducer
 */

const initialState = {
  work: {
    totalTime: 0,
    durationInMinute: 0.1
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
  }),

  WORK_TIME_INCREASE: (state) => Object.assign({}, state, {
    work: {
      ...state.work,
      totalTime: state.work.totalTime + 1
    }
  }),

  REST_TIME_INCREASE: (state) => Object.assign({}, state, {
    rest: {
      ...state.rest,
      totalTime: state.rest.totalTime + 1
    }
  }),

  DISTRACTION_TIME_INCREASE: (state) => Object.assign({}, state, {
    distraction: {
      ...state.distraction,
      totalTime: state.distraction.totalTime + 1
    }
  }),

  TIMER_PROGRESS_SET: (state, {payload}) => Object.assign({}, state, {
    timer: {
      ...state.timer,
      progress: payload
    }
  }),

  TIMER_TYPE_SET: (state, {payload}) => Object.assign({}, state, {
    timer: {
      ...state.timer,
      currentType: payload
    }
  }),

  SETTING_OPEN: (state) => Object.assign({}, state, {
    settings: {
      ...state.settings,
      toggleStatus: true
    }
  }),

  SETTING_CLOSE: (state) => Object.assign({}, state, {
    settings: {
      ...state.settings,
      toggleStatus: false
    }
  }),

  SETTING_TOGGLE: (state) => Object.assign({}, state, {
    settings: {
      ...state.settings,
      toggleStatus: !state.settings.toggleStatus
    }
  }),

  STAT_DISTRACTION_SET: (state) => Object.assign({}, state, {
    stats: {
      ...state.stats,
      distractionOccurence: state.stats.distractionOccurence + 1
    }
  }),

  STAT_REST_COMPLETE_SET: (state) => Object.assign({}, state, {
    stats: {
      ...state.stats,
      restCompleted: state.stats.restCompleted + 1
    }
  }),

  STAT_WORK_COMPLETE_SET: (state) => Object.assign({}, state, {
    stats: {
      ...state.stats,
      workCompleted: state.stats.workCompleted + 1
    }
  })

}, initialState)