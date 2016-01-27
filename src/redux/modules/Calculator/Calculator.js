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
export const CALC_INPUT_SET = 'CALC_INPUT_SET'

export const CALC_ADD = 'CALC_ADD'
export const CALC_ADD_ACTIVE_SET = 'CALC_ADD_ACTIVE_SET'

export const CALC_NUMBER_SAVE = 'CALC_NUMBER_SAVE'
export const CALC_NUMBER_SET = 'CALC_NUMBER_SET'
export const CALC_NUMBER_CLEAR = 'CALC_NUMBER_CLEAR'
export const CALC_METHOD_SET = 'CALC_METHOD_SET'
export const CALC_METHOD_CLEAR = 'CALC_METHOD_CLEAR'

export const CALC_EQUAL_ACTIVE_SET = 'CALC_EQUAL_ACTIVE_SET'
export const CALC_EQUAL_VARIABLE_SET = 'CALC_EQUAL_VARIABLE_SET'
export const CALC_EQUAL_PREV_METHOD_SET = 'CALC_EQUAL_PREV_METHOD_SET'
export const CALC_EQUAL_RESULT_SET = 'CALC_EQUAL_RESULT_SET'
export const CALC_EQUAL_RESULT_UPDATE = 'CALC_EQUAL_RESULT_UPDATE'

// work on this tomorrow and work on chaining results, fix decimal number addition= test for when the . button is press then use parseFloat
export const CALC_RESET = 'CALC_RESET'

/**
 * Actions
 */

export const calcInputClear = createAction(CALC_INPUT_CLEAR)
export const calcInputUpdate = createAction(CALC_INPUT_UPDATE, value => value)
export const calcInputSet = createAction(CALC_INPUT_SET, value => value)

export const calcOutputClear = createAction(CALC_OUTPUT_CLEAR)
export const calcOutputSet = createAction(CALC_OUTPUT_SET, value => value)
export const calcOutputUpdate = createAction(CALC_OUTPUT_UPDATE, value => value)
export const calcOutputShouldClear = createAction(CALC_OUTPUT_SHOULD_CLEAR, value => value)

export const calcEqualActiveSet = createAction(CALC_EQUAL_ACTIVE_SET, value => value)
export const calcEqualPrevMethodSet = createAction(CALC_EQUAL_PREV_METHOD_SET, method => method)
export const calcEqualResultSet = createAction(CALC_EQUAL_RESULT_SET, value => value)
export const calcEqualResultUpdate = createAction(CALC_EQUAL_RESULT_UPDATE, value => value)
export const calcEqualVariableSet = createAction(CALC_EQUAL_VARIABLE_SET, value => value)
export const calcAddActiveSet = createAction(CALC_ADD_ACTIVE_SET, value => value)

export const calcMethodSet = createAction(CALC_METHOD_SET, method => method)
export const calcMethodClear = createAction(CALC_METHOD_CLEAR)
export const calcNumberSave = createAction(CALC_NUMBER_SAVE)
export const calcNumberSet = createAction(CALC_NUMBER_SET)
export const calcNumberClear = createAction(CALC_NUMBER_CLEAR)

export const calcReset = () => (dispatch, getState) => {
  dispatch(calcInputSet('0'))
  dispatch(calcOutputSet('0'))
  dispatch(calcNumberClear())
  dispatch(calcMethodClear())
  dispatch(calcOutputShouldClear(false))
  dispatch(calcEqualActiveSet(false))
  dispatch(calcEqualResultSet(0))
  dispatch(calcEqualVariableSet(0))
  dispatch(calcEqualPrevMethodSet(''))
  dispatch(calcAddActiveSet(false))
}

export const calcButtonClick = (value) => (dispatch, getState) => {
  let shouldClearOutput = getState().Calculator.outputClear

  // check to force only one 0
  if (getState().Calculator.input === '0') {
    if (value === '0') {
      return
    }
  }

  if (shouldClearOutput === true) {
    dispatch(calcOutputClear())
    dispatch(calcInputClear())
    dispatch(calcOutputShouldClear(false))
  }

  // overwrite exisiting default 0 then update otherwise update normally
  if (getState().Calculator.input === '0') {
    dispatch(calcInputSet(value))
    dispatch(calcOutputSet(value))
  } else {
    dispatch(calcOutputUpdate(value))
    dispatch(calcInputUpdate(value))
  }
}

export const calcAdd = () => (dispatch, getState) => {
  let numbersLength = getState().Calculator.numbers.length

  //  when add is active and there's no input then return
  if (getState().Calculator.add.active === true) {
    if (getState().Calculator.input === '') {
      return
    }
  }
  console.log(getState().Calculator.input.length !== 0)
  // if there's input then do add
  if (getState().Calculator.input.length !== 0) {
    dispatch(calcAddActiveSet(true))
    // dispatch(calcEqualActiveSet(false))
    dispatch(calcNumberSave())
    dispatch(calcInputClear())
    dispatch(calcMethodSet('add'))
    // this is important to make sure that after the user select a methods then the next time they enter a numbers the output should be clear and display the new numbers
    dispatch(calcOutputShouldClear(true))
    // for use case of this series of inputs (1 + 2 = + 1 =) should output 4
  } else if (getState().Calculator.output.length !== 0) {
    dispatch(calcAddActiveSet(true))
    dispatch(calcInputSet(getState().Calculator.output))
    dispatch(calcNumberSave())
    dispatch(calcInputClear())
    dispatch(calcMethodSet('add'))
  } else {
    return
  }

  // if user press + button again when there's at least one number saved already
  if (numbersLength === 1) {
    dispatch(calcResultGet('add'))
    return
  }
}

export const calcResultGet = (method) => (dispatch, getState) => {
  let currentMethod = getState().Calculator.methodActive
  dispatch(calcMethodClear())
  dispatch(calcEqualActiveSet(true))

  // logic for chaining add functions
  if (method === 'add') {
    // this add the second number
    dispatch(calcNumberSave())
    let numberArr = getState().Calculator.numbers
    let result
    result = numberArr[0] + numberArr[1]
    // store second variable, methods and result to use for calculation if the user press = again
    dispatch(calcEqualVariableSet(numberArr[1]))
    dispatch(calcEqualPrevMethodSet(currentMethod))
    dispatch(calcEqualResultSet(result))
    // set calc equal active to false to avoid double calculation
    dispatch(calcEqualActiveSet(false))

    dispatch(calcOutputSet(result))
    dispatch(calcInputClear())
    dispatch(calcNumberClear())
    // set the input back to the result for chaining of addition
    dispatch(calcNumberSet(result))
    dispatch(calcOutputShouldClear(true))
    // dispatch(calcAddActiveSet(false))
  }

  if (method === 'equal') {
    if (getState().Calculator.add.active === true) {
      let numberArr = getState().Calculator.numbers
      let result
      result = numberArr[0] + numberArr[1]
      // store second variable, methods and result to use for calculation if the user press = again
      dispatch(calcEqualVariableSet(numberArr[1]))
      dispatch(calcEqualPrevMethodSet('add'))
      dispatch(calcEqualResultSet(result))
      // set calc equal active to false to avoid double calculation
      dispatch(calcEqualActiveSet(false))
      dispatch(calcOutputSet(result))
      dispatch(calcInputClear())
      dispatch(calcNumberClear())
      dispatch(calcAddActiveSet(false))
      dispatch(calcOutputShouldClear(true))
    }
  }
  // logic to calculate if the use press = again.
  // if (getState().Calculator.equal.active === true) {
  //   let prevMethod = getState().Calculator.equal.prevMethod
  //   // let prevResult = getState().Calculator.equal.result
  //   let variable = getState().Calculator.equal.variable
  //   if (prevMethod === 'add') {
  //     dispatch(calcNumberSave())
  //     dispatch(calcEqualResultUpdate(variable))
  //     dispatch(calcOutputSet(getState().Calculator.equal.result))
  //     dispatch(calcInputClear())
  //     dispatch(calcInputSet(getState().Calculator.equal.result).toString())
  //     dispatch(calcNumberClear())
  //     dispatch(calcOutputShouldClear(true))
  //     dispatch(calcAddActiveSet(false))
  //   }
  // }
}

export const calcEqual = () => (dispatch, getState) => {
  dispatch(calcMethodSet('equal'))
  dispatch(calcOutputShouldClear(true))

  // save number if there's already one number and that input is not empty
  if (getState().Calculator.numbers.length === 1 && getState().Calculator.input !== '') {
    // this add the second number
    dispatch(calcNumberSave())
  }
  // to take into account use case where series of input is (+ =) should return 0, (+ 1) should return 1
  if (getState().Calculator.numbers.length === 1 && getState().Calculator.input === '') {
    dispatch(calcInputSet('0'))
    dispatch(calcNumberSave())
  }

  // do equal only when there's two numbers saved up
  if (getState().Calculator.numbers.length === 2) {
    dispatch(calcResultGet('equal'))
  } else {
    return
  }
}

export const actions = {
  calcButtonClick,
  calcReset,
  calcAdd,
  calcEqual
}

/**
 * Reducer
 */

var initialState = {
  input: '0',
  numbers: [],
  methodActive: '',
  add: {
    active: false
  },
  equal: {
    active: false,
    prevMethod: '',
    variable: 0,
    result: 0
  },
  outputClear: false,
  output: '0'
}

export const Calculator = handleActions({
  CALC_ADD_ACTIVE_SET: (state, {payload}) => Object.assign({}, state, {
    add: {
      ...state.add,
      active: payload
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
      result: payload
    }
  }),

  CALC_EQUAL_RESULT_UPDATE: (state, {payload}) => Object.assign({}, state, {
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

  CALC_INPUT_CLEAR: (state) => Object.assign({}, state, {
    input: ''
  }),

  CALC_INPUT_SET: (state, {payload}) => Object.assign({}, state, {
    input: payload
  }),

  CALC_INPUT_UPDATE: (state, {payload}) => Object.assign({}, state, {
    input: state.input.concat(payload)
  }),

  CALC_METHOD_SET: (state, {payload}) => Object.assign({}, state, {
    methodActive: payload
  }),

  CALC_METHOD_CLEAR: (state) => Object.assign({}, state, {
    methodActive: ''
  }),

  CALC_NUMBER_SAVE: (state) => Object.assign({}, state, {
    numbers: [...state.numbers, parseInt(state.input, 10)]
  }),

  CALC_NUMBER_CLEAR: (state) => Object.assign({}, state, {
    numbers: []
  }),

  CALC_NUMBER_SET: (state, {payload}) => Object.assign({}, state, {
    numbers: [payload]
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