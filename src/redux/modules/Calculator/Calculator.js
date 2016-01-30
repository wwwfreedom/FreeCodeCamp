import { createAction, handleActions } from 'redux-actions'

/**
 * Util functions
 */

// return true for case like 1.021 and false for 1 or 1.0
function isDecimalNumber (value) {
  return (!isNaN(value) && value.toString().indexOf('.') !== -1)
}

// calculate longest decimal length given an array of two numbers
function decimalLength (arrOfNum, result) {
  var decimalTest = () => {
    var testArr = arrOfNum.map((num) => isDecimalNumber(num))
    if (testArr[0] === true || testArr[1] === true || isDecimalNumber(result)) {
      return true
    } else {
      return false
    }
  }
  // get abolute number without the signs
  var stripNumOfNegativeSign = arrOfNum.map((num) => Math.abs(num))
  var arrOfNumInStringLength = stripNumOfNegativeSign.map((num) => num.toString().length)
  var longestNumber = Math.max(arrOfNumInStringLength[0], arrOfNumInStringLength[1])

  if (decimalTest() === true) {
    if (isDecimalNumber(result)) {
      let resultStringLength = result.toString().length - 2
      // limit the maximum decimal length to 8
      let maxResultNumber = Math.min(resultStringLength, 8)
      return maxResultNumber
    }
    let number = longestNumber - 2
    let maxNumber = Math.min(number, 8)
    return maxNumber
  } else {
    return 0
  }
}

/**
 * Constants
 */

export const CALC_ADD_ACTIVE_SET = 'CALC_ADD_ACTIVE_SET'
export const CALC_ADD_CALLBACK_SET = 'CALC_ADD_CALLBACK_SET'
export const CALC_DIVIDE_ACTIVE_SET = 'CALC_DIVIDE_ACTIVE_SET'
export const CALC_DIVIDE_CALLBACK_SET = 'CALC_DIVIDE_CALLBACK_SET'
export const CALC_DOT_ACTIVE_SET = 'CALC_DOT_ACTIVE_SET'

export const CALC_EQUAL_ACTIVE_SET = 'CALC_EQUAL_ACTIVE_SET'
export const CALC_EQUAL_PREV_METHOD_SET = 'CALC_EQUAL_PREV_METHOD_SET'
export const CALC_EQUAL_RESULT_SET = 'CALC_EQUAL_RESULT_SET'
export const CALC_EQUAL_RESULT_UPDATE = 'CALC_EQUAL_RESULT_UPDATE'
export const CALC_EQUAL_VARIABLE_SET = 'CALC_EQUAL_VARIABLE_SET'

export const CALC_INPUT_CLEAR = 'CALC_INPUT_CLEAR'
export const CALC_INPUT_SET = 'CALC_INPUT_SET'
export const CALC_INPUT_UPDATE = 'CALC_INPUT_UPDATE'

export const CALC_METHOD_SET = 'CALC_METHOD_SET'
export const CALC_METHOD_CLEAR = 'CALC_METHOD_CLEAR'

export const CALC_MULTIPLY_ACTIVE_SET = 'CALC_MULTIPLY_ACTIVE_SET'
export const CALC_MULTIPLY_CALLBACK_SET = 'CALC_MULTIPLY_CALLBACK_SET'

export const CALC_NUMBER_CLEAR = 'CALC_NUMBER_CLEAR'
export const CALC_NUMBER_SAVE = 'CALC_NUMBER_SAVE'
export const CALC_NUMBER_SET = 'CALC_NUMBER_SET'

export const CALC_MINUS_ACTIVE_SET = 'CALC_MINUS_ACTIVE_SET'
export const CALC_MINUS_CALLBACK_SET = 'CALC_MINUS_CALLBACK_SET'

export const CALC_OUTPUT_CLEAR = 'CALC_OUTPUT_CLEAR'
export const CALC_OUTPUT_SET = 'CALC_OUTPUT_SET'
export const CALC_OUTPUT_SHOULD_CLEAR = 'CALC_OUTPUT_SHOULD_CLEAR'
export const CALC_OUTPUT_UPDATE = 'CALC_OUTPUT_UPDATE'

export const CALC_RESET = 'CALC_RESET'

/**
 * Actions
 */

export const calcAddActiveSet = createAction(CALC_ADD_ACTIVE_SET, value => value)
export const calcAddCallbackSet = createAction(CALC_ADD_CALLBACK_SET, value => value)

export const calcDivideActiveSet = createAction(CALC_DIVIDE_ACTIVE_SET, value => value)
export const calcDivideCallbackSet = createAction(CALC_DIVIDE_CALLBACK_SET, value => value)
export const calcDotActiveSet = createAction(CALC_DOT_ACTIVE_SET, value => value)

export const calcEqualActiveSet = createAction(CALC_EQUAL_ACTIVE_SET, value => value)
export const calcEqualPrevMethodSet = createAction(CALC_EQUAL_PREV_METHOD_SET, method => method)
export const calcEqualResultSet = createAction(CALC_EQUAL_RESULT_SET, value => value)
export const calcEqualResultUpdate = createAction(CALC_EQUAL_RESULT_UPDATE, value => value)
export const calcEqualVariableSet = createAction(CALC_EQUAL_VARIABLE_SET, value => value)

export const calcInputClear = createAction(CALC_INPUT_CLEAR)
export const calcInputSet = createAction(CALC_INPUT_SET, value => value)
export const calcInputUpdate = createAction(CALC_INPUT_UPDATE, value => value)

export const calcMethodClear = createAction(CALC_METHOD_CLEAR)
export const calcMethodSet = createAction(CALC_METHOD_SET, method => method)

export const calcMinusActiveSet = createAction(CALC_MINUS_ACTIVE_SET, value => value)
export const calcMinusCallbackSet = createAction(CALC_MINUS_CALLBACK_SET, value => value)

export const calcMultiplyActiveSet = createAction(CALC_MULTIPLY_ACTIVE_SET, value => value)
export const calcMultiplyCallbackSet = createAction(CALC_MULTIPLY_CALLBACK_SET, value => value)

export const calcNumberClear = createAction(CALC_NUMBER_CLEAR)
export const calcNumberSave = createAction(CALC_NUMBER_SAVE)
export const calcNumberSet = createAction(CALC_NUMBER_SET)

export const calcOutputClear = createAction(CALC_OUTPUT_CLEAR)
export const calcOutputSet = createAction(CALC_OUTPUT_SET, value => value)
export const calcOutputShouldClear = createAction(CALC_OUTPUT_SHOULD_CLEAR, value => value)
export const calcOutputUpdate = createAction(CALC_OUTPUT_UPDATE, value => value)

/**
 * Thunk Actions (asynchronous actions)
 */

export const calcReset = () => (dispatch, getState) => {
  dispatch(calcInputSet('0'))
  dispatch(calcOutputSet('0'))
  dispatch(calcNumberClear())
  dispatch(calcMethodClear())
  dispatch(calcOutputShouldClear(false))
  dispatch(calcEqualActiveSet(false))
  dispatch(calcEqualResultSet('0'))
  dispatch(calcEqualVariableSet('0'))
  dispatch(calcEqualPrevMethodSet(''))
  dispatch(calcAddActiveSet(false))
  dispatch(calcAddCallbackSet(false))
  dispatch(calcDivideActiveSet(false))
  dispatch(calcDivideCallbackSet(false))
  dispatch(calcDotActiveSet(false))
  dispatch(calcMinusActiveSet(false))
  dispatch(calcMinusCallbackSet(false))
  dispatch(calcMultiplyActiveSet(false))
  dispatch(calcMultiplyCallbackSet(false))
}

export const calcDotButtonClick = (value) => (dispatch, getState) => {
  // to stop multiple dots
  if (getState().Calculator.dot.active === true) {
    return
  }

  // clear the output and input if necessary
  if (getState().Calculator.outputClear === true) {
    dispatch(calcOutputClear())
    dispatch(calcInputClear())
    dispatch(calcOutputShouldClear(false))
  }

  // pad prececing zero for default input 0 or no input
  if (getState().Calculator.input === '0' || getState().Calculator.input.length === 0) {
    dispatch(calcDotActiveSet(true))
    dispatch(calcInputSet('0.'))
    dispatch(calcOutputSet('0.'))
  } else {
    dispatch(calcDotActiveSet(true))
    dispatch(calcOutputUpdate(value))
    dispatch(calcInputUpdate(value))
  }
}

export const calcButtonClick = (value) => (dispatch, getState) => {
  let shouldClearOutput = getState().Calculator.outputClear
  let inputLength = getState().Calculator.input.length

  // return if input length exceed maximum
  if (inputLength >= 9) {
    return
  }

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
  // if user switch method then call equal and then set a call back to resume add operation below. For use case (1 - 2 + :: 3)
  if (getState().Calculator.methodActive !== '') {
    if (getState().Calculator.outputClear === false) {
      if (getState().Calculator.add.active === false) {
        if (getState().Calculator.methodActive !== 'add') {
          dispatch(calcAddCallbackSet(true))
          dispatch(calcEqual())
          return
        }
      }
    }
  }

    // logic to clear the number when user change their mind and switch method. Deal with use case (1 + - :: 1)

  if (getState().Calculator.outputClear === true) {
    if (getState().Calculator.add.active === false) {
      if (getState().Calculator.methodActive !== 'add') {
        dispatch(calcNumberClear())
        dispatch(calcDivideActiveSet(false))
        dispatch(calcMinusActiveSet(false))
        dispatch(calcMultiplyActiveSet(false))
      }
    }
  }

  //  when add is active and there's no input then return
  if (getState().Calculator.add.active === true) {
    if (getState().Calculator.input === '') {
      return
    }
  }
  // if there's input then do add
  if (getState().Calculator.input.length !== 0) {
    dispatch(calcAddActiveSet(true))
    // dispatch the right numberSave according to dot active status
    if (getState().Calculator.dot.active === true) {
      dispatch(calcDotActiveSet(false))
    }
    dispatch(calcNumberSave())
    dispatch(calcInputClear())
    dispatch(calcMethodSet('add'))
    // this is important to make sure that after the user select a methods then the next time they enter a numbers the output should be clear and display the new numbers
    dispatch(calcOutputShouldClear(true))

    // for use case of this series of inputs (1 + 2 = + 1 =) should output 4 or use case (1 + 2 + :: 3)
  } else if (getState().Calculator.output.length !== 0) {
    dispatch(calcAddActiveSet(true))
    // dispatch the right numberSave according to dot active status
    if (getState().Calculator.dot.active === true) {
      dispatch(calcDotActiveSet(false))
    }
    dispatch(calcInputSet(getState().Calculator.output))
    dispatch(calcNumberSave())
    dispatch(calcInputClear())
    dispatch(calcMethodSet('add'))
  } else {
    return
  }

  // only call calcResultGet when there is two numbers. For use case (1 + 2 +)
  if (getState().Calculator.numbers.length === 2) {
    dispatch(calcResultGet('add'))
    return
  }
}

export const calcMinus = (value) => (dispatch, getState) => {
  // if user switch method then call equal and then set a call back to resume minus operation below. For use case (1 + 2 - :: 3)
  if (getState().Calculator.methodActive !== '') {
    if (getState().Calculator.outputClear === false) {
      if (getState().Calculator.minus.active === false) {
        if (getState().Calculator.methodActive !== 'minus') {
          dispatch(calcMinusCallbackSet(true))
          dispatch(calcEqual())
          return
        }
      }
    }
  }

  // logic to clear the number when user change their mind and switch method. Deal with use case (1 + - :: 1)
  if (getState().Calculator.outputClear === true) {
    if (getState().Calculator.minus.active === false) {
      if (getState().Calculator.methodActive !== 'minus') {
        dispatch(calcNumberClear())
        dispatch(calcAddActiveSet(false))
        dispatch(calcDivideActiveSet(false))
        dispatch(calcMultiplyActiveSet(false))
      }
    }
  }

  // when minus is active and there's no input then return. For use case (+ +)
  if (getState().Calculator.minus.active === true) {
    if (getState().Calculator.input === '') {
      return
    }
  }

  // if there's input then do minus
  if (getState().Calculator.input.length !== 0) {
    dispatch(calcMinusActiveSet(true))
    // dispatch the right numberSave according to dot active status
    if (getState().Calculator.dot.active === true) {
      dispatch(calcDotActiveSet(false))
    }
    dispatch(calcNumberSave())
    dispatch(calcInputClear())
    dispatch(calcMethodSet('minus'))
    // this is important to make sure that after the user select a methods then the next time they enter a numbers the output should be clear and display the new numbers
    dispatch(calcOutputShouldClear(true))
    // for use case of this series of inputs (1 - 2 = - 1 =) should output 4 or (1 + 2 - :: 3)
  } else if (getState().Calculator.output.length !== 0) {
    dispatch(calcMinusActiveSet(true))
    // dispatch the right numberSave according to dot active status
    if (getState().Calculator.dot.active === true) {
      dispatch(calcDotActiveSet(false))
    }
    dispatch(calcInputSet(getState().Calculator.output))
    dispatch(calcNumberSave())
    dispatch(calcInputClear())
    dispatch(calcMethodSet('minus'))
  } else {
    return
  }

  // only call calcResultGet when there is two numbers. For use case (1 + 2 +)
  if (getState().Calculator.numbers.length === 2) {
    dispatch(calcResultGet('minus'))
    return
  }
}

/**
 * Multiplication logic
 */

export const calcMultiply = (value) => (dispatch, getState) => {
  // if user switch method then call equal and then set a call back to resume multiply operation below. For use case (1 * 2 - :: 2)
  if (getState().Calculator.methodActive !== '') {
    if (getState().Calculator.outputClear === false) {
      if (getState().Calculator.multiply.active === false) {
        if (getState().Calculator.methodActive !== 'multiply') {
          dispatch(calcMultiplyCallbackSet(true))
          dispatch(calcEqual())
          return
        }
      }
    }
  }

  // logic to clear the number when user change their mind and switch method. Deal with use case (1 * - :: 1)
  if (getState().Calculator.outputClear === true) {
    if (getState().Calculator.multiply.active === false) {
      if (getState().Calculator.methodActive !== 'multiply') {
        dispatch(calcNumberClear())
        dispatch(calcAddActiveSet(false))
        dispatch(calcMinusActiveSet(false))
        dispatch(calcDivideActiveSet(false))
      }
    }
  }

  // when multiply is active and there's no input then return. For use case (* *)
  if (getState().Calculator.multiply.active === true) {
    if (getState().Calculator.input === '') {
      return
    }
  }

  // if there's input then do multiply
  if (getState().Calculator.input.length !== 0) {
    dispatch(calcMultiplyActiveSet(true))
    // dispatch the right numberSave according to dot active status
    if (getState().Calculator.dot.active === true) {
      dispatch(calcDotActiveSet(false))
    }
    dispatch(calcNumberSave())
    dispatch(calcInputClear())
    dispatch(calcMethodSet('multiply'))
    dispatch(calcOutputShouldClear(true))
    // for use case of this series of inputs (1 * 2 :: 2 = :: 4) should output 4 or (1 * 2 - :: 2)
  } else if (getState().Calculator.output.length !== 0) {
    dispatch(calcMultiplyActiveSet(true))
    if (getState().Calculator.dot.active === true) {
      dispatch(calcDotActiveSet(false))
    }
    dispatch(calcInputSet(getState().Calculator.output))
    dispatch(calcNumberSave())
    dispatch(calcInputClear())
    dispatch(calcMethodSet('multiply'))
  } else {
    return
  }

  // only call calcResultGet when there is two numbers. For use case (1 + 2 +)
  if (getState().Calculator.numbers.length === 2) {
    dispatch(calcResultGet('multiply'))
    return
  }
}

/**
 * Division logic
 */

export const calcDivide = (value) => (dispatch, getState) => {
  // if user switch method then call equal and then set a call back to resume divide operation below. For use case (1 / 2 - :: 0.5)
  if (getState().Calculator.methodActive !== '') {
    if (getState().Calculator.outputClear === false) {
      if (getState().Calculator.divide.active === false) {
        if (getState().Calculator.methodActive !== 'divide') {
          dispatch(calcDivideCallbackSet(true))
          dispatch(calcEqual())
          return
        }
      }
    }
  }

  // logic to clear the number when user change their mind and switch method. Deal with use case (1 / - :: 1)
  if (getState().Calculator.outputClear === true) {
    if (getState().Calculator.divide.active === false) {
      if (getState().Calculator.methodActive !== 'divide') {
        dispatch(calcNumberClear())
        dispatch(calcAddActiveSet(false))
        dispatch(calcMinusActiveSet(false))
        dispatch(calcMultiplyActiveSet(false))
      }
    }
  }

  // when divide is active and there's no input then return. For use case (* *)
  if (getState().Calculator.divide.active === true) {
    if (getState().Calculator.input === '') {
      return
    }
  }

  // if there's input then do divide
  if (getState().Calculator.input.length !== 0) {
    dispatch(calcDivideActiveSet(true))
    // dispatch the right numberSave according to dot active status
    if (getState().Calculator.dot.active === true) {
      dispatch(calcDotActiveSet(false))
    }
    dispatch(calcNumberSave())
    dispatch(calcInputClear())
    dispatch(calcMethodSet('divide'))
    dispatch(calcOutputShouldClear(true))
    // for use case of this series of inputs (1 / 2 :: 0.5 = :: 0.25) should output 0.25 or (1 / 2 - :: 0.5)
  } else if (getState().Calculator.output.length !== 0) {
    dispatch(calcDivideActiveSet(true))
    if (getState().Calculator.dot.active === true) {
      dispatch(calcDotActiveSet(false))
    }
    dispatch(calcInputSet(getState().Calculator.output))
    dispatch(calcNumberSave())
    dispatch(calcInputClear())
    dispatch(calcMethodSet('divide'))
  } else {
    return
  }

  // only call calcResultGet when there is two numbers. For use case (1 / 2 /)
  if (getState().Calculator.numbers.length === 2) {
    dispatch(calcResultGet('divide'))
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
    if (getState().Calculator.dot.active === true) {
      dispatch(calcDotActiveSet(false))
    }
    dispatch(calcNumberSave())
    let numberArr = getState().Calculator.numbers
    let result
    result = numberArr[0] + numberArr[1]
    let decimal = decimalLength(numberArr, result)
    // store second variable, methods and result to use for calculation if the user press = again
    dispatch(calcEqualVariableSet(numberArr[1].toString()))
    dispatch(calcEqualPrevMethodSet(currentMethod))
    dispatch(calcEqualResultSet(result.toString()))
    // set calc equal active to false to avoid double calculation
    dispatch(calcEqualActiveSet(false))
    // check for decimal number to return result of whole interger in format of 1 instead of 1.0
    if (isDecimalNumber(result)) {
      dispatch(calcOutputSet(result.toFixed(decimal)))
    } else {
      dispatch(calcOutputSet(result.toString()))
    }
    dispatch(calcInputClear())
    dispatch(calcNumberClear())
    // set the input back to the result for chaining of addition
    dispatch(calcNumberSet(result))
    dispatch(calcOutputShouldClear(true))
  }

  // logic for chaining minus functions
  if (method === 'minus') {
    // this minus the second number
    if (getState().Calculator.dot.active === true) {
      dispatch(calcDotActiveSet(false))
    }
    dispatch(calcNumberSave()) // this step could be reduntdant
    let numberArr = getState().Calculator.numbers
    let result
    result = numberArr[0] - numberArr[1]
    let decimal = decimalLength(numberArr, result)
    // store second variable, methods and result to use for calculation if the user press = again
    dispatch(calcEqualVariableSet(numberArr[1].toString()))
    dispatch(calcEqualPrevMethodSet(currentMethod))
    dispatch(calcEqualResultSet(result.toString()))
    // set calc equal active to false to avoid double calculation
    dispatch(calcEqualActiveSet(false))
    // check for decimal number to return result of whole interger in format of 1 instead of 1.0
    if (isDecimalNumber(result)) {
      dispatch(calcOutputSet(result.toFixed(decimal)))
    } else {
      dispatch(calcOutputSet(result.toString()))
    }
    dispatch(calcInputClear())
    dispatch(calcNumberClear())
    // set the input back to the result for chaining of addition
    // potential problem here because if the result is a decimal number it might not get translated back properly
    dispatch(calcNumberSet(result))
    dispatch(calcOutputShouldClear(true))
  }

  // logic for chaining multiply functions
  if (method === 'multiply') {
    if (getState().Calculator.dot.active === true) {
      dispatch(calcDotActiveSet(false))
    }
    dispatch(calcNumberSave()) // this step could be reduntdant
    let numberArr = getState().Calculator.numbers
    let result
    result = numberArr[0] * numberArr[1]
    let decimal = decimalLength(numberArr, result)
    // store second variable, methods and result to use for calculation if the user press = again
    dispatch(calcEqualVariableSet(numberArr[1].toString()))
    dispatch(calcEqualPrevMethodSet(currentMethod))
    dispatch(calcEqualResultSet(result.toString()))
    // set calc equal active to false to avoid double calculation
    dispatch(calcEqualActiveSet(false))
    // check for decimal number to return result of whole interger in format of 1 instead of 1.0
    if (isDecimalNumber(result)) {
      dispatch(calcOutputSet(result.toFixed(decimal)))
    } else {
      dispatch(calcOutputSet(result.toString()))
    }
    dispatch(calcInputClear())
    dispatch(calcNumberClear())
    // set the input back to the result for chaining of addition
    // potential problem here because if the result is a decimal number it might not get translated back properly
    dispatch(calcNumberSet(result))
    dispatch(calcOutputShouldClear(true))
  }

  // logic for chaining divide functions
  if (method === 'divide') {
    if (getState().Calculator.dot.active === true) {
      dispatch(calcDotActiveSet(false))
    }
    dispatch(calcNumberSave()) // this step could be reduntdant
    let numberArr = getState().Calculator.numbers
    let result
    result = numberArr[0] / numberArr[1]
    let decimal = decimalLength(numberArr, result)
    // store second variable, methods and result to use for calculation if the user press = again
    dispatch(calcEqualVariableSet(numberArr[1].toString()))
    dispatch(calcEqualPrevMethodSet(currentMethod))
    dispatch(calcEqualResultSet(result.toString()))
    // set calc equal active to false to avoid double calculation
    dispatch(calcEqualActiveSet(false))
    // check for decimal number to return result of whole interger in format of 1 instead of 1.0
    if (isDecimalNumber(result)) {
      console.log('calling toFixed')
      dispatch(calcOutputSet(result.toFixed(decimal)))
    } else {
      dispatch(calcOutputSet(result.toString()))
    }
    dispatch(calcInputClear())
    dispatch(calcNumberClear())
    // set the input back to the result for chaining of addition
    // potential problem here because if the result is a decimal number it might not get translated back properly
    dispatch(calcNumberSet(result))
    dispatch(calcOutputShouldClear(true))
  }

  // logic to compute on press of = button
  if (method === 'equal') {
    // logic to do plus calculation
    if (getState().Calculator.add.active === true) {
      let numberArr = getState().Calculator.numbers
      let result
      result = numberArr[0] + numberArr[1]
      let decimal = decimalLength(numberArr, result)
      // store second variable, methods and result to use for calculation if the user press = again
      dispatch(calcEqualVariableSet(numberArr[1].toString()))
      dispatch(calcEqualPrevMethodSet('add'))
      dispatch(calcEqualResultSet(result.toString()))
      // set calc equal active to false to avoid double calculation
      dispatch(calcEqualActiveSet(false))
      if (isDecimalNumber(result)) {
        dispatch(calcOutputSet(result.toFixed(decimal)))
      } else {
        dispatch(calcOutputSet(result.toString()))
      }
      dispatch(calcInputClear())
      dispatch(calcNumberClear())
      dispatch(calcAddActiveSet(false))
      dispatch(calcOutputShouldClear(true))
    }

    // logic to do the actual minus calculation
    if (getState().Calculator.minus.active === true) {
      let numberArr = getState().Calculator.numbers
      let result
      result = numberArr[0] - numberArr[1]
      let decimal = decimalLength(numberArr, result)
      // store second variable, methods and result to use for calculation if the user press = again
      dispatch(calcEqualVariableSet(numberArr[1].toString()))
      dispatch(calcEqualPrevMethodSet('minus'))
      dispatch(calcEqualResultSet(result.toString()))
      // set calc equal active to false to avoid double calculation
      dispatch(calcEqualActiveSet(false))
      if (isDecimalNumber(result)) {
        dispatch(calcOutputSet(result.toFixed(decimal)))
      } else {
        dispatch(calcOutputSet(result.toString()))
      }
      dispatch(calcInputClear())
      dispatch(calcNumberClear())
      dispatch(calcMinusActiveSet(false))
      dispatch(calcOutputShouldClear(true))
    }

    // logic to do the actual multiply calculation
    if (getState().Calculator.multiply.active === true) {
      let numberArr = getState().Calculator.numbers
      let result
      result = numberArr[0] * numberArr[1]
      let decimal = decimalLength(numberArr, result)
      // store second variable, methods and result to use for calculation if the user press = again
      dispatch(calcEqualVariableSet(numberArr[1].toString()))
      dispatch(calcEqualPrevMethodSet('multiply'))
      dispatch(calcEqualResultSet(result.toString()))
      // set calc equal active to false to avoid double calculation
      dispatch(calcEqualActiveSet(false))
      if (isDecimalNumber(result)) {
        dispatch(calcOutputSet(result.toFixed(decimal)))
      } else {
        dispatch(calcOutputSet(result.toString()))
      }
      dispatch(calcInputClear())
      dispatch(calcNumberClear())
      dispatch(calcMultiplyActiveSet(false))
      dispatch(calcOutputShouldClear(true))
    }

    // logic to do the actual divide calculation
    if (getState().Calculator.divide.active === true) {
      let numberArr = getState().Calculator.numbers
      let result
      result = numberArr[0] / numberArr[1]
      let decimal = decimalLength(numberArr, result)
      // store second variable, methods and result to use for calculation if the user press = again
      dispatch(calcEqualVariableSet(numberArr[1].toString()))
      dispatch(calcEqualPrevMethodSet('divide'))
      dispatch(calcEqualResultSet(result.toString()))
      // set calc equal active to false to avoid double calculation
      dispatch(calcEqualActiveSet(false))
      if (isDecimalNumber(result)) {
        dispatch(calcOutputSet(result.toFixed(decimal)))
      } else {
        dispatch(calcOutputSet(result.toString()))
      }
      dispatch(calcInputClear())
      dispatch(calcNumberClear())
      dispatch(calcDivideActiveSet(false))
      dispatch(calcOutputShouldClear(true))
    }
  }

  // logic to do calculation when = is press again
  if (method === 'equalAgain') {
    if (getState().Calculator.equal.prevMethod === 'add') {
      let prevResult = getState().Calculator.equal.result
      let variable = getState().Calculator.equal.variable
      dispatch(calcInputSet(prevResult))
      dispatch(calcNumberSave())
      dispatch(calcInputSet(variable))
      dispatch(calcNumberSave())
      dispatch(calcAddActiveSet(true))
      dispatch(calcResultGet('equal'))
    }

    if (getState().Calculator.equal.prevMethod === 'minus') {
      let prevResult = getState().Calculator.equal.result
      let variable = getState().Calculator.equal.variable
      dispatch(calcInputSet(prevResult))
      dispatch(calcNumberSave())
      dispatch(calcInputSet(variable))
      dispatch(calcNumberSave())
      dispatch(calcMinusActiveSet(true))
      dispatch(calcResultGet('equal'))
    }

    if (getState().Calculator.equal.prevMethod === 'multiply') {
      let prevResult = getState().Calculator.equal.result
      let variable = getState().Calculator.equal.variable
      dispatch(calcInputSet(prevResult))
      dispatch(calcNumberSave())
      dispatch(calcInputSet(variable))
      dispatch(calcNumberSave())
      dispatch(calcMultiplyActiveSet(true))
      dispatch(calcResultGet('equal'))
    }

    if (getState().Calculator.equal.prevMethod === 'divide') {
      let prevResult = getState().Calculator.equal.result
      let variable = getState().Calculator.equal.variable
      dispatch(calcInputSet(prevResult))
      dispatch(calcNumberSave())
      dispatch(calcInputSet(variable))
      dispatch(calcNumberSave())
      dispatch(calcDivideActiveSet(true))
      dispatch(calcResultGet('equal'))
    }
  }

  // this gets run if their is a callback schedule, set the prevMethod to the correct method of the callback without this operation chaining will produce incorrect result. also reset the callback to default false
  if (getState().Calculator.add.callback === true) {
    dispatch(calcMethodSet('add'))
    dispatch(calcEqualPrevMethodSet('add'))
    dispatch(calcAddCallbackSet(false))
    dispatch(calcAdd())
  }

  if (getState().Calculator.minus.callback === true) {
    dispatch(calcMethodSet('minus'))
    dispatch(calcEqualPrevMethodSet('minus'))
    dispatch(calcMinusCallbackSet(false))
    dispatch(calcMinus())
  }

  if (getState().Calculator.multiply.callback === true) {
    dispatch(calcMethodSet('multiply'))
    dispatch(calcEqualPrevMethodSet('multiply'))
    dispatch(calcMultiplyCallbackSet(false))
    dispatch(calcMultiply())
  }

  if (getState().Calculator.divide.callback === true) {
    dispatch(calcMethodSet('divide'))
    dispatch(calcEqualPrevMethodSet('divide'))
    dispatch(calcDivideCallbackSet(false))
    dispatch(calcDivide())
  }
}

export const calcEqual = () => (dispatch, getState) => {
  dispatch(calcMethodSet('equal'))
  dispatch(calcOutputShouldClear(true))

  // save number if there's already one number and that input is not empty
  if (getState().Calculator.numbers.length === 1 && getState().Calculator.input !== '') {
    if (getState().Calculator.dot.active === true) {
      dispatch(calcDotActiveSet(false))
    }
    // this add the second number
    dispatch(calcNumberSave())
  }
  // for use case where series of input is (+ =) should return 0, (+ 1) should return 1 subsequent press of equal should increase by 1
  if (getState().Calculator.numbers.length === 1 && getState().Calculator.input === '' && getState().Calculator.numbers[0] === 0) {
    dispatch(calcInputSet('0'))
    dispatch(calcNumberSave())
  }

  // for use case where series of input (2 + =) should return 4 and variable as 4. subsequent press of equal should increase by 2
  if (getState().Calculator.numbers.length === 1 && getState().Calculator.input === '' && getState().Calculator.numbers[0] !== 0) {
    let variable = getState().Calculator.output
    dispatch(calcInputSet(variable))
    dispatch(calcNumberSave())
  }

  // do equal only when there's two numbers saved up
  if (getState().Calculator.numbers.length === 2) {
    // turn off dot when done
    if (getState().Calculator.dot.active === true) {
      dispatch(calcDotActiveSet(false))
    }
    dispatch(calcResultGet('equal'))
  } else if (getState().Calculator.input === '' && getState().Calculator.numbers.length === 0) {
    // turn off dot when done
    if (getState().Calculator.dot.active === true) {
      dispatch(calcDotActiveSet(false))
    }
    dispatch(calcResultGet('equalAgain'))
  } else {
    return
  }
}

export const actions = {
  calcButtonClick,
  calcReset,
  calcAdd,
  calcEqual,
  calcDotButtonClick,
  calcMinus,
  calcMultiply,
  calcDivide
}

/**
 * Reducer
 */

var initialState = {
  input: '0',
  numbers: [],
  methodActive: '',
  add: {
    active: false,
    callback: false
  },
  minus: {
    active: false,
    callback: false
  },
  multiply: {
    active: false,
    callback: false
  },
  divide: {
    active: false,
    callback: false
  },
  equal: {
    active: false,
    prevMethod: '',
    variable: '0',
    result: '0'
  },
  dot: {
    active: false
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

  CALC_ADD_CALLBACK_SET: (state, {payload}) => Object.assign({}, state, {
    add: {
      ...state.add,
      callback: payload
    }
  }),

  CALC_DIVIDE_ACTIVE_SET: (state, {payload}) => Object.assign({}, state, {
    divide: {
      ...state.divide,
      active: payload
    }
  }),

  CALC_DIVIDE_CALLBACK_SET: (state, {payload}) => Object.assign({}, state, {
    divide: {
      ...state.divide,
      callback: payload
    }
  }),

  CALC_DOT_ACTIVE_SET: (state, {payload}) => Object.assign({}, state, {
    dot: {
      ...state.dot,
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

  CALC_MINUS_ACTIVE_SET: (state, {payload}) => Object.assign({}, state, {
    minus: {
      ...state.minus,
      active: payload
    }
  }),

  CALC_MINUS_CALLBACK_SET: (state, {payload}) => Object.assign({}, state, {
    minus: {
      ...state.minus,
      callback: payload
    }
  }),

  CALC_MULTIPLY_ACTIVE_SET: (state, {payload}) => Object.assign({}, state, {
    multiply: {
      ...state.multiply,
      active: payload
    }
  }),

  CALC_MULTIPLY_CALLBACK_SET: (state, {payload}) => Object.assign({}, state, {
    multiply: {
      ...state.multiply,
      callback: payload
    }
  }),

  CALC_NUMBER_SAVE: (state) => Object.assign({}, state, {
    numbers: [...state.numbers, parseFloat(state.input)]
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
    output: payload
  }),

  CALC_OUTPUT_UPDATE: (state, {payload}) => Object.assign({}, state, {
    output: state.output.concat(payload)
  })
}, initialState)