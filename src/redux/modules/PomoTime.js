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
export const TIMER_TYPE_SET = 'TIMER_TYPE_SET'

export const DISTRACTION_TIME_INCREASE = 'DISTRACTION_TIME_INCREASE'

export const STAT_WORK_COMPLETE_SET = 'STAT_WORK_COMPLETE_SET'
export const STAT_REST_COMPLETE_SET = 'STAT_REST_COMPLETE_SET'
export const STAT_DISTRACTION_SET = 'STAT_DISTRACTION_SET'

export const GOAL_DAILY_INCREASE = 'GOAL_DAILY_INCREASE'
export const GOAL_DAILY_DECREASE = 'GOAL_DAILY_DECREASE'

export const WORK_DURATION_INCREASE = 'WORK_DURATION_INCREASE'
export const WORK_DURATION_DECREASE = 'WORK_DURATION_DECREASE'
export const WORK_DURATION_CHANGE = 'WORK_DURATION_CHANGE'
export const WORK_TIME_INCREASE = 'WORK_TIME_INCREASE'

export const REST_DURATION_INCREASE = 'REST_DURATION_INCREASE'
export const REST_DURATION_DECREASE = 'REST_DURATION_DECREASE'
export const REST_TIME_INCREASE = 'REST_TIME_INCREASE'

export const SETTING_ALARM_AUDIO_TOGGLE = 'SETTING_ALARM_AUDIO_TOGGLE'
export const SETTING_AUTO_BREAK_TOGGLE = 'SETTING_AUTO_BREAK_TOGGLE'
export const SETTING_ALARM_NOTIFICATION_TOGGLE = 'SETTING_ALARM_NOTIFICATION_TOGGLE'

export const ALARM_SOUND_PLAY_ON = 'ALARM_SOUND_PLAY_ON'
export const ALARM_SOUND_PLAY_OFF = 'ALARM_SOUND_PLAY_OFF'

/**
 * Actions
 */

export const alarmSoundPlayOff = createAction(ALARM_SOUND_PLAY_OFF)
export const alarmSoundPlayOn = createAction(ALARM_SOUND_PLAY_ON)

export const settingAutoBreakToggle = createAction(SETTING_AUTO_BREAK_TOGGLE)
export const settingAlarmAudioToggle = createAction(SETTING_ALARM_AUDIO_TOGGLE)
export const settingAlarmNotificationToggle = createAction(SETTING_ALARM_NOTIFICATION_TOGGLE)

export const countDownStart = createAction(COUNTDOWN_START)
export const countDownPause = createAction(COUNTDOWN_PAUSE)
export const countDownReset = createAction(COUNTDOWN_RESET)

export const workTimeIncrease = createAction(WORK_TIME_INCREASE)
export const workDurationIncrease = createAction(WORK_DURATION_INCREASE, value => value)
export const workDurationDecrease = createAction(WORK_DURATION_DECREASE, value => value)

// thunk action to control the increase and decrease of timers duration length
export const timerDurationChange = (timer, type, value) => (dispatch, getState) => {
  let currentWorkDuration = getState().PomoTime.work.durationInMinute
  let currentRestDuration = getState().PomoTime.rest.durationInMinute

  // set maximum work duration to 60 minutes
  if (currentWorkDuration < 60) {
    if (type === 'increase' && timer === 'work') {
      dispatch(workDurationIncrease(value))
    }
  }

  // set max rest duration to 60 minutes
  if (currentWorkDuration < 60) {
    if (type === 'increase' && timer === 'rest') {
      dispatch(restDurationIncrease(value))
    }
  }

  // set min rest duration to 0
  if (currentRestDuration > 0) {
    if (type === 'decrease' && timer === 'rest') {
      dispatch(restDurationDecrease(value))
    }
  }

  // set min work duration
  if (currentWorkDuration > 0) {
    if (type === 'decrease' && timer === 'work') {
      dispatch(workDurationDecrease(value))
    }
  }
}

export const restTimeIncrease = createAction(REST_TIME_INCREASE)
export const restDurationIncrease = createAction(REST_DURATION_INCREASE, value => value)
export const restDurationDecrease = createAction(REST_DURATION_DECREASE, value => value)

export const distractionTimeIncrease = createAction(DISTRACTION_TIME_INCREASE)

export const goalDailyDecrease = createAction(GOAL_DAILY_DECREASE, value => value)
export const goalDailyIncrease = createAction(GOAL_DAILY_INCREASE, value => value)
export const goalChange = (goal, type, value) => (dispatch, getState) => {
  let currentDailyGoal = getState().PomoTime.goals.daily

  // set minimum goal to 1
  if (currentDailyGoal > 1) {
    // check for daily goals
    if (goal === 'dailyGoal') {
      if (type === 'decrease') {
        dispatch(goalDailyDecrease(value))
      }
    }
  }

  // logic to increase the daily goal
  if (goal === 'dailyGoal') {
    if (type === 'increase') {
      dispatch(goalDailyIncrease(value))
    }
  }
}

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
  timerDurationChange,
  restTimeIncrease,
  restDurationDecrease,
  restDurationIncrease,
  distractionTimeIncrease,
  settingClose,
  settingOpen,
  settingToggle,
  timerProgressSet,
  timerTypeSet,
  statDistractionSet,
  statRestCompleteSet,
  statWorkCompleteSet,
  goalChange,
  settingAlarmNotificationToggle,
  settingAlarmAudioToggle,
  settingAutoBreakToggle,
  alarmSoundPlayOff,
  alarmSoundPlayOn
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
    progress: 0,
    alarmSoundPlayingStatus: false
  },
  settings: {
    toggleStatus: false,
    alarmMute: false,
    dailyGoal: 5,
    autoBreak: false,
    alarmNotify: false,
    alarmSoundSource: 'http://soundbible.com/mp3/A-Tone-His_Self-1266414414.mp3'
  },
  stats: {
    restCompleted: 0,
    workCompleted: 0,
    distractionOccurence: 0
  },
  goals: {
    daily: 10
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

  WORK_DURATION_INCREASE: (state, {payload}) => Object.assign({}, state, {
    work: {
      ...state.work,
      durationInMinute: state.work.durationInMinute + payload
    }
  }),

  WORK_DURATION_DECREASE: (state, {payload}) => Object.assign({}, state, {
    work: {
      ...state.work,
      durationInMinute: state.work.durationInMinute - payload
    }
  }),

  REST_DURATION_INCREASE: (state, {payload}) => Object.assign({}, state, {
    rest: {
      ...state.rest,
      durationInMinute: state.rest.durationInMinute + payload
    }
  }),

  REST_DURATION_DECREASE: (state, {payload}) => Object.assign({}, state, {
    rest: {
      ...state.rest,
      durationInMinute: state.rest.durationInMinute - payload
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

  // turn off the alarm in Audio player component
  ALARM_SOUND_PLAY_OFF: (state) => Object.assign({}, state, {
    timer: {
      ...state.timer,
      alarmSoundPlayingStatus: false
    }
  }),

  ALARM_SOUND_PLAY_ON: (state) => Object.assign({}, state, {
    timer: {
      ...state.timer,
      alarmSoundPlayingStatus: true
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

  SETTING_AUTO_BREAK_TOGGLE: (state) => Object.assign({}, state, {
    settings: {
      ...state.settings,
      autoBreak: !state.settings.autoBreak
    }
  }),

  SETTING_ALARM_AUDIO_TOGGLE: (state) => Object.assign({}, state, {
    settings: {
      ...state.settings,
      alarmMute: !state.settings.alarmMute
    }
  }),

  SETTING_ALARM_NOTIFICATION_TOGGLE: (state) => Object.assign({}, state, {
    settings: {
      ...state.settings,
      alarmNotify: !state.settings.alarmNotify
    }
  }),

  GOAL_DAILY_INCREASE: (state, {payload}) => Object.assign({}, state, {
    goals: {
      ...state.goals,
      daily: state.goals.daily + 1
    }
  }),

  GOAL_DAILY_DECREASE: (state, {payload}) => Object.assign({}, state, {
    goals: {
      ...state.goals,
      daily: state.goals.daily - 1
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