import { createAction, handleActions } from 'redux-actions'

/**
 * Constants
 */

export const CALC_OUTPUT_CLEAR = 'CALC_OUTPUT_CLEAR'
export const CALC_OUTPUT_SET = 'CALC_OUTPUT_SET'
export const CALC_OUTPUT_UPDATE = 'CALC_OUTPUT_UPDATE'
export const CALC_OUTPUT_SHOULD_CLEAR = 'CALC_OUTPUT_SHOULD_CLEAR'
export const CALC_INPUT_CLEAR = 'CALC_INPUT_CLEAR'
export const CALC_INPUT_UPDATE = 'CALC_INPUT_UPDATE'

export const CALC_ADD = 'CALC_ADD'
export const CALC_NUMBER_SAVE = 'CALC_NUMBER_SAVE'
export const CALC_NUMBER_CLEAR = 'CALC_NUMBER_CLEAR'
export const CALC_METHOD_SET = 'CALC_METHOD_SET'
export const CALC_METHOD_CLEAR = 'CALC_METHOD_CLEAR'

export const CALC_EQUAL_ACTIVE_SET = 'CALC_EQUAL_ACTIVE_SET'
export const CALC_EQUAL_VARIABLE_SET = 'CALC_EQUAL_VARIABLE_SET'
export const CALC_EQUAL_PREV_METHOD_SET = 'CALC_EQUAL_PREV_METHOD_SET'
export const CALC_EQUAL_RESULT_SET = 'CALC_EQUAL_RESULT_SET'

// work on this tomorrow and work on chaining results, fix decimal number addition= test for when the . button is press then use parseFloat
export const CALC_RESET = 'CALC_RESET'

/**
 * Actions
 */

export const calcInputClear = createAction(CALC_INPUT_CLEAR)
export const calcInputUpdate = createAction(CALC_INPUT_UPDATE, value => value)

export const calcOutputClear = createAction(CALC_OUTPUT_CLEAR)
export const calcOutputSet = createAction(CALC_OUTPUT_SET, value => value)
export const calcOutputUpdate = createAction(CALC_OUTPUT_UPDATE, value => value)
export const calcOutputShouldClear = createAction(CALC_OUTPUT_SHOULD_CLEAR, value => value)

export const calcEqualActiveSet = createAction(CALC_EQUAL_ACTIVE_SET, value => value)
export const calcEqualPrevMethodSet = createAction(CALC_EQUAL_PREV_METHOD_SET, method => method)
export const calcEqualResultSet = createAction(CALC_EQUAL_RESULT_SET, value => value)
export const calcEqualVariableSet = createAction(CALC_EQUAL_VARIABLE_SET, value => value)

export const calcMethodSet = createAction(CALC_METHOD_SET, method => method)
export const calcMethodClear = createAction(CALC_METHOD_CLEAR)
export const calcNumberSave = createAction(CALC_NUMBER_SAVE)
export const calcNumberClear = createAction(CALC_NUMBER_CLEAR)

export const calcButtonClick = (value) => (dispatch, getState) => {
  let shouldClearOutput = getState().Calculator.outputClear

  if (shouldClearOutput === true) {
    dispatch(calcOutputClear())
    dispatch(calcOutputShouldClear(false))
  }
  dispatch(calcOutputUpdate(value))
  dispatch(calcInputUpdate(value))
}

export const calcAdd = () => (dispatch, getState) => {
  let currentMethod = getState().Calculator.methods.current

  // if user press + button again just return
  if (currentMethod === 'add') {
    return
  }
  dispatch(calcNumberSave())
  dispatch(calcInputClear())
  dispatch(calcMethodSet('add'))
  dispatch(calcEqualActiveSet(false))
  // this is important to make sure that after the user select a methods then the next time they enter a numbers the output should be clear and display the new numbers
  dispatch(calcOutputShouldClear(true))
}

export const calcResultGet = () => (dispatch, getState) => {
  dispatch(calcNumberSave())
  let currentMethod = getState().Calculator.methods.current
  let numberArr = getState().Calculator.numbers
  let result
  dispatch(calcMethodClear())
  dispatch(calcEqualActiveSet(true))

  if (currentMethod === 'add') {
    result = numberArr[0] + numberArr[1]
    // store second variable, methods and result to use for calculation if the user press = again
    dispatch(calcEqualVariableSet(numberArr[1]))
    dispatch(calcEqualPrevMethodSet(currentMethod))
    dispatch(calcEqualResultSet(result))
    // import set calc equal active to false to avoid double calculation
    dispatch(calcEqualActiveSet(false))

    dispatch(calcOutputSet(result))
    dispatch(calcInputClear())
    dispatch(calcNumberClear())
    dispatch(calcOutputShouldClear(true))
  }

  // logic to calculate if the use press = again.
  if (getState().Calculator.equal.active === true) {
    let prevMethod = getState().Calculator.equal.prevMethod
    // let prevResult = getState().Calculator.equal.result
    let variable = getState().Calculator.equal.variable
    if (prevMethod === 'add') {
      dispatch(calcEqualResultSet(variable))
      dispatch(calcOutputSet(getState().Calculator.equal.result))
      dispatch(calcInputClear())
      dispatch(calcNumberClear())
      dispatch(calcOutputShouldClear(true))
    }
  }
}

export const actions = {
  calcButtonClick,
  calcOutputClear,
  calcAdd,
  calcResultGet
}

/**
 * Reducer
 */

var initialState = {
  input: '',
  numbers: [],
  methods: {
    current: '',
    add: {
      // result: 0,
      variable: 0
    }
  },
  equal: {
    active: false,
    prevMethod: '',
    variable: 0,
    result: 0
  },
  outputClear: false,
  result: 0,
  output: ''
}

export const Calculator = handleActions({
  CALC_INPUT_CLEAR: (state) => Object.assign({}, state, {
    input: ''
  }),

  CALC_INPUT_UPDATE: (state, {payload}) => Object.assign({}, state, {
    input: state.input.concat(payload)
  }),

  CALC_METHOD_SET: (state, {payload}) => Object.assign({}, state, {
    methods: {
      ...state.methods,
      current: payload
    }
  }),

  CALC_EQUAL_ACTIVE_SET: (state, {payload}) => Object.assign({}, state, {
    equal: {
      ...state.equal,
      active: payload
    }
  }),

  CALC_EQUAL_PREV_METHOD_SET: (state, {payload}) => Object.assign({}, state, {
    equal: {
      ...state.equal,
      prevMethod: payload
    }
  }),

  CALC_EQUAL_RESULT_SET: (state, {payload}) => Object.assign({}, state, {
    equal: {
      ...state.equal,
      result: state.equal.result + payload
    }
  }),

  CALC_EQUAL_VARIABLE_SET: (state, {payload}) => Object.assign({}, state, {
    equal: {
      ...state.equal,
      variable: payload
    }
  }),

  CALC_METHOD_CLEAR: (state) => Object.assign({}, state, {
    methods: {
      ...state.methods,
      current: ''
    }
  }),

  CALC_NUMBER_SAVE: (state) => Object.assign({}, state, {
    numbers: [...state.numbers, parseInt(state.input, 10)]
  }),

  CALC_NUMBER_CLEAR: (state) => Object.assign({}, state, {
    numbers: []
  }),

  CALC_OUTPUT_CLEAR: (state) => Object.assign({}, state, {
    output: ''
  }),

  CALC_OUTPUT_SHOULD_CLEAR: (state, {payload}) => Object.assign({}, state, {
    outputClear: payload
  }),

  CALC_OUTPUT_SET: (state, {payload}) => Object.assign({}, state, {
    output: payload.toString()
  }),

  CALC_OUTPUT_UPDATE: (state, {payload}) => Object.assign({}, state, {
    output: state.output.concat(payload)
  })
}, initialState)