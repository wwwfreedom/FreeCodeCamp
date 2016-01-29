import { Calculator, CALC_OUTPUT_CLEAR, calcOutputClear, CALC_OUTPUT_SET, calcOutputSet, CALC_OUTPUT_UPDATE, calcOutputUpdate, CALC_OUTPUT_SHOULD_CLEAR, calcOutputShouldClear, CALC_INPUT_CLEAR, calcInputClear, CALC_INPUT_UPDATE, calcInputUpdate, CALC_NUMBER_SAVE, calcNumberSave, CALC_NUMBER_CLEAR, calcNumberClear, CALC_METHOD_SET, calcMethodSet, CALC_METHOD_CLEAR, calcMethodClear, CALC_EQUAL_ACTIVE_SET, calcEqualActiveSet, CALC_EQUAL_VARIABLE_SET, calcEqualVariableSet, CALC_EQUAL_PREV_METHOD_SET, calcEqualPrevMethodSet, CALC_EQUAL_RESULT_SET, calcEqualResultSet, calcAdd, calcButtonClick, calcResultGet, calcEqualResultUpdate, CALC_EQUAL_RESULT_UPDATE, calcReset, CALC_INPUT_SET, calcInputSet, CALC_NUMBER_SET, calcNumberSet, calcAddActiveSet, CALC_ADD_ACTIVE_SET, calcDotActiveSet, CALC_DOT_ACTIVE_SET, calcMinusActiveSet, CALC_MINUS_ACTIVE_SET, calcMinusCallbackSet, CALC_MINUS_CALLBACK_SET, calcAddCallbackSet, CALC_ADD_CALLBACK_SET, calcEqual, calcMinus, calcDotButtonClick } from 'redux/modules/Calculator/Calculator.js'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import util from 'util'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('(Redux) Calculator ', () => {
  // Reducer tests
  describe('Reducer', () => {
    let initialState = {
      input: '2',
      numbers: [1],
      methodActive: '',
      add: {
        active: false,
        callback: false
      },
      minus: {
        active: false,
        callback: false
      },
      equal: {
        active: false,
        prevMethod: '',
        variable: 0,
        result: 1
      },
      dot: {
        active: false
      },
      outputClear: false,
      output: 'test'
    }

    it('should overwrite and set add active property on calling calcAddActiveSet', () => {
      expect(Calculator(initialState, calcAddActiveSet(true))).to.eql(Object.assign({}, initialState, { add: {...initialState.add, active: true} }))
    })

    it('should set add callback property on calling calcAddCallbackSet', () => {
      expect(Calculator(initialState, calcAddCallbackSet(true))).to.eql(Object.assign({}, initialState, { add: {...initialState.add, callback: true} }))
    })

    it('should overwrite and set dot active property on calling calcDotActiveSet', () => {
      expect(Calculator(initialState, calcDotActiveSet(true))).to.eql(Object.assign({}, initialState, { dot: {active: true} }))
    })

    it('should set equal to active on calling calcEqualActiveSet', () => {
      expect(Calculator(initialState, calcEqualActiveSet(true))).to.eql(Object.assign({}, initialState, {equal: {...initialState.equal, active: true}}))
    })

    it('should set equal prevMethod on calling calcEqualPrevMethodSet', () => {
      expect(Calculator(initialState, calcEqualPrevMethodSet('add'))).to.eql(Object.assign({}, initialState, {equal: {...initialState.equal, prevMethod: 'add'}}))
    })

    it('should set equal result on calling calcEqualResultSet', () => {
      expect(Calculator(initialState, calcEqualResultSet(5))).to.eql(Object.assign({}, initialState, {equal: {...initialState.equal, result: 5}}))
    })

    it('should update equal result on calling calcEqualResultUpdate', () => {
      expect(Calculator(initialState, calcEqualResultUpdate(2))).to.eql(Object.assign({}, initialState, {equal: {...initialState.equal, result: 3}}))
    })

    it('should set equal variable on calling calcEqualVariableSet', () => {
      expect(Calculator(initialState, calcEqualVariableSet(2))).to.eql(Object.assign({}, initialState, {equal: {...initialState.equal, variable: 2}}))
    })

    it('should set empty input on calling calcInputClear', () => {
      expect(Calculator(initialState, calcInputClear())).to.eql(Object.assign({}, initialState, { input: '' }))
    })

    it('should set input on calling calcInputSet', () => {
      expect(Calculator(initialState, calcInputSet('test'))).to.eql(Object.assign({}, initialState, { input: 'test' }))
    })

    it('should update input on calling calcInputUpdate', () => {
      expect(Calculator(initialState, calcInputUpdate('test1'))).to.eql(Object.assign({}, initialState, { input: '2test1' }))
    })

    it('should set right method on calling calcMethodClear', () => {
      expect(Calculator(initialState, calcMethodClear())).to.eql(Object.assign({}, initialState, {methodActive: ''}))
    })

    it('should set right method on calling calcMethodSet', () => {
      expect(Calculator(initialState, calcMethodSet('add'))).to.eql(Object.assign({}, initialState, {methodActive: 'add'}))
    })

    it('should overwrite and set minus active property on calling calcMinusActiveSet', () => {
      expect(Calculator(initialState, calcMinusActiveSet(true))).to.eql(Object.assign({}, initialState, { minus: {...initialState.minus, active: true} }))
    })

    it('should set minus callback property on calling calcMinusCallbackSet', () => {
      expect(Calculator(initialState, calcMinusCallbackSet(true))).to.eql(Object.assign({}, initialState, { minus: {...initialState.minus, callback: true} }))
    })

    it('should set right numbers on calling calcNumberClear', () => {
      expect(Calculator(initialState, calcNumberClear())).to.eql(Object.assign({}, initialState, {numbers: []}))
    })

    it('should set right numbers on calling calcNumberSave', () => {
      expect(Calculator(initialState, calcNumberSave())).to.eql(Object.assign({}, initialState, {numbers: [1, 2]}))
    })

    it('should overwrite and set number on calling calcNumberSet', () => {
      expect(Calculator(initialState, calcNumberSet(5))).to.eql(Object.assign({}, initialState, {numbers: [5]}))
    })

    it('should clear the output on calling calcOutputClear', () => {
      expect(Calculator(initialState, calcOutputClear())).to.eql(Object.assign({}, initialState, { output: '' }))
    })

    it('should set the right output on calling calcOutputSet', () => {
      expect(Calculator(initialState, calcOutputSet('test'))).to.eql(Object.assign({}, initialState, { output: 'test' }))
    })

    it('should set right outputClear value on calling calcOutputShouldClear', () => {
      expect(Calculator(initialState, calcOutputShouldClear(true))).to.eql(Object.assign({}, initialState, { outputClear: true }))
    })

    it('should update the output on calling calcOutputUpdate', () => {
      expect(Calculator(initialState, calcOutputUpdate('moretest'))).to.eql(Object.assign({}, initialState, { output: 'testmoretest' }))
    })
  })

  /**
   * // Actions test
   */

  describe('Actions', () => {
    describe('calcAddActiveSet', () => {
      it('should create a CALC_ADD_ACTIVE_SET action', () => {
        expect(calcAddActiveSet(true)).to.eql({type: CALC_ADD_ACTIVE_SET, payload: true})
      })
    })

    describe('calcAddCallbackSet', () => {
      it('should create a CALC_ADD_CALLBACK_SET action', () => {
        expect(calcAddCallbackSet(true)).to.eql({type: CALC_ADD_CALLBACK_SET, payload: true})
      })
    })

    describe('calcDotActiveSet', () => {
      it('should create a CALC_DOT_ACTIVE_SET action', () => {
        expect(calcDotActiveSet(true)).to.eql({type: CALC_DOT_ACTIVE_SET, payload: true})
      })
    })

    describe('calcEqualActiveSet', () => {
      it('should create a CALC_EQUAL_ACTIVE_SET action', () => {
        expect(calcEqualActiveSet(true)).to.eql({type: CALC_EQUAL_ACTIVE_SET, payload: true})
      })
    })

    describe('calcEqualPrevMethodSet', () => {
      it('should create a CALC_EQUAL_PREV_METHOD_SET action', () => {
        expect(calcEqualPrevMethodSet('add')).to.eql({type: CALC_EQUAL_PREV_METHOD_SET, payload: 'add'})
      })
    })

    describe('calcEqualResultSet', () => {
      it('should create a CALC_EQUAL_RESULT_SET action', () => {
        expect(calcEqualResultSet(5)).to.eql({type: CALC_EQUAL_RESULT_SET, payload: 5})
      })
    })

    describe('calcEqualResultUpdate', () => {
      it('should create a CALC_EQUAL_RESULT_UPDATE action', () => {
        expect(calcEqualResultUpdate(5)).to.eql({type: CALC_EQUAL_RESULT_UPDATE, payload: 5})
      })
    })

    describe('calcEqualVariableSet', () => {
      it('should create a CALC_EQUAL_VARIABLE_SET action', () => {
        expect(calcEqualVariableSet(10)).to.eql({type: CALC_EQUAL_VARIABLE_SET, payload: 10})
      })
    })

    describe('calcInputClear', () => {
      it('should create a CALC_INPUT_CLEAR action', () => {
        expect(calcInputClear()).to.eql({type: CALC_INPUT_CLEAR, payload: undefined})
      })
    })

    describe('calcInputSet', () => {
      it('should create a CALC_INPUT_SET action', () => {
        expect(calcInputSet('test')).to.eql({type: CALC_INPUT_SET, payload: 'test'})
      })
    })

    describe('calcInputUpdate', () => {
      it('should create a CALC_INPUT_UPDATE action', () => {
        expect(calcInputUpdate('test')).to.eql({type: CALC_INPUT_UPDATE, payload: 'test'})
      })
    })

    describe('calcMethodSet', () => {
      it('should create a CALC_METHOD_SET action', () => {
        expect(calcMethodSet('add')).to.eql({type: CALC_METHOD_SET, payload: 'add'})
      })
    })

    describe('calcMethodClear', () => {
      it('should create a CALC_METHOD_CLEAR action', () => {
        expect(calcMethodClear()).to.eql({type: CALC_METHOD_CLEAR, payload: undefined})
      })
    })

    describe('calcNumberClear', () => {
      it('should create a CALC_NUMBER_CLEAR action', () => {
        expect(calcNumberClear()).to.eql({type: CALC_NUMBER_CLEAR, payload: undefined})
      })
    })

    describe('calcNumberSave', () => {
      it('should create a CALC_NUMBER_SAVE action', () => {
        expect(calcNumberSave()).to.eql({type: CALC_NUMBER_SAVE, payload: undefined})
      })
    })

    describe('calcNumberSet', () => {
      it('should create a CALC_NUMBER_SET action', () => {
        expect(calcNumberSet()).to.eql({type: CALC_NUMBER_SET, payload: undefined})
      })
    })

    describe('calcMinusActiveSet', () => {
      it('should create a CALC_MINUS_ACTIVE_SET action', () => {
        expect(calcMinusActiveSet(true)).to.eql({type: CALC_MINUS_ACTIVE_SET, payload: true})
      })
    })

    describe('calcMinusCallbackSet', () => {
      it('should create a CALC_MINUS_CALLBACK_SET action', () => {
        expect(calcMinusCallbackSet(true)).to.eql({type: CALC_MINUS_CALLBACK_SET, payload: true})
      })
    })

    describe('calcOutputClear', () => {
      it('should create a CALC_OUTPUT_CLEAR action', () => {
        expect(calcOutputClear()).to.eql({type: CALC_OUTPUT_CLEAR, payload: undefined})
      })
    })

    describe('calcOutputSet', () => {
      it('should create a CALC_OUTPUT_SET action', () => {
        expect(calcOutputSet('test')).to.eql({type: CALC_OUTPUT_SET, payload: 'test'})
      })
    })

    describe('calcOutputShouldClear', () => {
      it('should create a CALC_OUTPUT_SHOULD_CLEAR action', () => {
        expect(calcOutputShouldClear(false)).to.eql({type: CALC_OUTPUT_SHOULD_CLEAR, payload: false})
      })
    })

    describe('calcOutputUpdate', () => {
      it('should create a CALC_OUTPUT_UPDATE action', () => {
        expect(calcOutputUpdate('test1')).to.eql({type: CALC_OUTPUT_UPDATE, payload: 'test1'})
      })
    })
  })

  /**
   * Thunk actions
   */
  describe('Thunk actions', () => {
    describe('calcDotButtonClick', () => {
      let initialState = {
        input: '',
        numbers: [1],
        methodActive: '',
        dot: {
          active: false
        },
        outputClear: true,
        output: ''
      }

      it('should return a function', () => {
        expect(calcDotButtonClick()).to.be.a('function')
      })

      it('should dispatch these actions when input is 0 or input is empty outputClear is true ', (done) => {
        const mockState = {Calculator: initialState}
        const expectedActions = [
          calcOutputClear(),
          calcInputClear(),
          calcOutputShouldClear(false),
          calcDotActiveSet(true),
          calcInputSet('0.'),
          calcOutputSet('0.')
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcDotButtonClick(0))
      })

      it('should dispatch these actions when there is input and outputClear is false ', (done) => {
        const mockState = {Calculator: Object.assign({}, initialState, {
          input: '2',
          outputClear: false
        })}
        const expectedActions = [
          calcDotActiveSet(true),
          calcOutputUpdate(2),
          calcInputUpdate(2)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcDotButtonClick(2))
      })
    })
    describe('calcAdd', () => {
      let initialState = {
        input: '2',
        numbers: [1],
        methodActive: '',
        add: {
          active: false,
          callback: false
        },
        minus: {
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
        output: 'test'
      }
      it('should return a function', () => {
        expect(calcAdd()).to.be.a('function')
      })

      it('should dispatch these actions when there is input', (done) => {
        const mockState = {Calculator: initialState}
        const expectedActions = [
          calcAddActiveSet(true),
          calcNumberSave(),
          calcInputClear(),
          calcMethodSet('add'),
          calcOutputShouldClear(true)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcAdd())
      })

      it('should dispatch these actions when there is input and dot method is active', (done) => {
        const mockState = {Calculator: Object.assign({}, initialState, {
          dot: { active: true }
        })}
        const expectedActions = [
          calcAddActiveSet(true),
          calcDotActiveSet(false),
          calcNumberSave(),
          calcInputClear(),
          calcMethodSet('add'),
          calcOutputShouldClear(true)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcAdd())
      })

      it('should dispatch these actions when there is output but no input for use case (1 + 2 = :: 3 + 1 = :: 4)', (done) => {
        const mockState = {Calculator: Object.assign({}, initialState, {
          input: '',
          output: '2'
        })}
        const expectedActions = [
          calcAddActiveSet(true),
          calcInputSet('2'),
          calcNumberSave(),
          calcInputClear(),
          calcMethodSet('add')
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcAdd())
      })

      it('should dispatch these actions when there is output but no input for use case (1 + 2 = :: 3 + 1 = :: 4) and dot method is active', (done) => {
        const mockState = {Calculator: Object.assign({}, initialState, {
          input: '',
          dot: { active: true },
          output: '2'
        })}
        const expectedActions = [
          calcAddActiveSet(true),
          calcDotActiveSet(false),
          calcInputSet('2'),
          calcNumberSave(),
          calcInputClear(),
          calcMethodSet('add')
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcAdd())
      })

      it('should dispatch these actions for chaining calcAdd for use case (1 - 2 + :: 3', (done) => {
        const mockState = {Calculator: Object.assign({}, initialState, {
          input: '2',
          numbers: [1],
          add: { active: false, callback: false },
          methodActive: 'minus',
          outputClear: false,
          output: '2'
        })}
        const expectedActions = [
          calcAddCallbackSet(true)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcAdd())
      })

      it('should dispatch these actions for switch between methods for use case (1 + - :: 1', (done) => {
        const mockState = {Calculator: Object.assign({}, initialState, {
          input: '2',
          numbers: [1],
          add: { active: false, callback: false },
          methodActive: 'minus',
          outputClear: true,
          output: '2'
        })}
        // there should be more actions but already test above key actions tested only
        const expectedActions = [
          calcNumberClear(),
          calcMinusActiveSet(false)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcAdd())
      })
    })

    describe('calcButtonClick', () => {
      it('should return a function', () => {
        expect(calcButtonClick()).to.be.a('function')
      })

      it('should dispatch these action on calling calcButtonClick when input is 0', (done) => {
        const mockState = { Calculator: { outputClear: false, input: '0' } }
        const expectedActions = [
          calcInputSet(1),
          calcOutputSet(1)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcButtonClick(1))
      })

      it('should dispatch these action on calling calcButtonClick when input is not 0', (done) => {
        const mockState = { Calculator: { outputClear: false, input: '2' } }
        const expectedActions = [
          calcOutputUpdate(1),
          calcInputUpdate(1)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcButtonClick(1))
      })

      it('should dispatch these action on calling calcButtonClick when outputClear is true', (done) => {
        const mockState = { Calculator: { outputClear: true } }
        const expectedActions = [
          calcOutputClear(),
          calcInputClear(),
          calcOutputShouldClear(false)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcButtonClick(1))
      })
    })

    describe('calcMinus', () => {
      let initialState = {
        input: '2',
        numbers: [1],
        methodActive: '',
        add: {
          active: false,
          callback: false
        },
        minus: {
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
        output: 'test'
      }

      it('should return a function', () => {
        expect(calcMinus()).to.be.a('function')
      })

      it('should dispatch these actions when there is input', (done) => {
        const mockState = {Calculator: initialState}
        const expectedActions = [
          calcMinusActiveSet(true),
          calcNumberSave(),
          calcInputClear(),
          calcMethodSet('minus'),
          calcOutputShouldClear(true)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcMinus())
      })

      it('should dispatch these actions when there is input and dot method is active', (done) => {
        const mockState = {Calculator: Object.assign({}, initialState, {
          dot: { active: true }
        })}
        const expectedActions = [
          calcMinusActiveSet(true),
          calcDotActiveSet(false),
          calcNumberSave(),
          calcInputClear(),
          calcMethodSet('minus'),
          calcOutputShouldClear(true)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcMinus())
      })

      it('should dispatch these actions when there is output but no input for use case (1 - 2 = :: -1 - 1 = :: -2)', (done) => {
        const mockState = {Calculator: Object.assign({}, initialState, {
          input: '',
          output: '2'
        })}
        const expectedActions = [
          calcMinusActiveSet(true),
          calcInputSet('2'),
          calcNumberSave(),
          calcInputClear(),
          calcMethodSet('minus')
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcMinus())
      })

      it('should dispatch these actions when there is output but no input and dot method is active. For use case (1 - 2 = :: -1 - 1 = :: -2)', (done) => {
        const mockState = {Calculator: Object.assign({}, initialState, {
          input: '',
          output: '2',
          dot: { active: true }
        })}
        const expectedActions = [
          calcMinusActiveSet(true),
          calcDotActiveSet(false),
          calcInputSet('2'),
          calcNumberSave(),
          calcInputClear(),
          calcMethodSet('minus')
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcMinus())
      })

      it('should dispatch these actions for chaining calcMinus for use case (1 - 2 + :: 3', (done) => {
        const mockState = {Calculator: Object.assign({}, initialState, {
          input: '2',
          numbers: [1],
          minus: { active: false, callback: false },
          methodActive: 'add',
          outputClear: false,
          output: '2'
        })}
        const expectedActions = [
          calcMinusCallbackSet(true)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcMinus())
      })

      it('should dispatch these actions for switch between methods for use case (1 - + :: 1', (done) => {
        const mockState = {Calculator: Object.assign({}, initialState, {
          input: '2',
          numbers: [1],
          minus: { active: false, callback: false },
          methodActive: 'add',
          outputClear: true,
          output: '2'
        })}
        // there should be more actions but already test above key actions tested only
        const expectedActions = [
          calcNumberClear(),
          calcAddActiveSet(false)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcMinus())
      })
    })

    describe('calcResultGet', () => {
      let mockStateForFirstPressOfEqualButton = {
        input: '2',
        numbers: [1, 2],
        methodActive: 'add',
        add: {
          active: false,
          callback: false
        },
        minus: {
          active: false,
          calback: false
        },
        equal: {
          active: false,
          prevMethod: '',
          variable: 0,
          result: 0
        },
        dot: {
          active: false
        },
        outputClear: false,
        output: 'test'
      }

      let mockStateForSubsequentPressOfEqualButton = {
        input: '2',
        numbers: [1, 2],
        methodActive: '',
        add: {
          active: false,
          callback: false
        },
        minus: {
          active: false,
          calback: false
        },
        equal: {
          active: true,
          prevMethod: 'add',
          variable: '2',
          result: '5'
        },
        dot: {
          active: false
        },
        outputClear: false,
        output: 'test'
      }

      it('should return a function', () => {
        expect(calcResultGet()).to.be.a('function')
      })

      it('should dispatch these actions on calling calcResultGet with "add" method', (done) => {
        const mockState = { Calculator: mockStateForFirstPressOfEqualButton }
        const expectedActions = [
          calcMethodClear(),
          calcEqualActiveSet(true),
          calcNumberSave(),
          calcEqualVariableSet('2'),
          calcEqualPrevMethodSet('add'),
          calcEqualResultSet('3'),
          calcEqualActiveSet(false),
          calcOutputSet('3'),
          calcInputClear(),
          calcNumberClear(),
          calcNumberSet(3),
          calcOutputShouldClear(true)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcResultGet('add'))
      })

      it('should dispatch these actions on calling calcResultGet with "minus" method', (done) => {
        const mockState = { Calculator: Object.assign({}, mockStateForFirstPressOfEqualButton, {
          methodActive: 'test'
        }) }
        const expectedActions = [
          calcMethodClear(),
          calcEqualActiveSet(true),
          calcNumberSave(),
          calcEqualVariableSet('2'),
          calcEqualPrevMethodSet('test'),
          calcEqualResultSet('-1'),
          calcEqualActiveSet(false),
          calcOutputSet('-1'),
          calcInputClear(),
          calcNumberClear(),
          calcNumberSet(-1),
          calcOutputShouldClear(true)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcResultGet('minus'))
      })

      it('should dispatch these actions on calling calcResultGet with "equal" method when add method is active', (done) => {
        const mockState = { Calculator: Object.assign({}, mockStateForFirstPressOfEqualButton, {
          add: { ...mockStateForFirstPressOfEqualButton, active: true }
        }) }
        const expectedActions = [
          calcMethodClear(),
          calcEqualActiveSet(true),
          calcEqualVariableSet('2'),
          calcEqualPrevMethodSet('add'),
          calcEqualResultSet('3'),
          calcEqualActiveSet(false),
          calcOutputSet('3'),
          calcInputClear(),
          calcNumberClear(),
          calcAddActiveSet(false),
          calcOutputShouldClear(true)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcResultGet('equal'))
      })

      it('should dispatch these actions on calling calcResultGet with "equal" method minus method is active', (done) => {
        const mockState = { Calculator: Object.assign({}, mockStateForFirstPressOfEqualButton, {
          minus: { ...mockStateForFirstPressOfEqualButton, active: true }
        }) }
        const expectedActions = [
          calcMethodClear(),
          calcEqualActiveSet(true),
          calcEqualVariableSet('2'),
          calcEqualPrevMethodSet('minus'),
          calcEqualResultSet('-1'),
          calcEqualActiveSet(false),
          calcOutputSet('-1'),
          calcInputClear(),
          calcNumberClear(),
          calcMinusActiveSet(false),
          calcOutputShouldClear(true)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcResultGet('equal'))
      })

      it('should dispatch these actions on subsequent call of calcResultGet i.e. when user press = button again. when prevMethod is add', (done) => {
        const mockState = { Calculator: mockStateForSubsequentPressOfEqualButton }
        const expectedActions = [
          calcMethodClear(),
          calcEqualActiveSet(true),
          calcInputSet('5'),
          calcNumberSave(),
          calcInputSet('2'),
          calcNumberSave(),
          calcAddActiveSet(true)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcResultGet('equalAgain'))
      })

      it('should dispatch these actions on subsequent call of calcResultGet i.e. when user press = button again. when prevMethod is minus', (done) => {
        const mockState = { Calculator: Object.assign({}, mockStateForSubsequentPressOfEqualButton, {
          equal: {...mockStateForSubsequentPressOfEqualButton.equal,
            prevMethod: 'minus'
          }
        }) }
        const expectedActions = [
          calcMethodClear(),
          calcEqualActiveSet(true),
          calcInputSet('5'),
          calcNumberSave(),
          calcInputSet('2'),
          calcNumberSave(),
          calcMinusActiveSet(true)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcResultGet('equalAgain'))
      })

      it('should dispatch these actions on call of calcResultGet minus callback prop is true', (done) => {
        const mockState = { Calculator: Object.assign({}, mockStateForFirstPressOfEqualButton, {
          minus: {...mockStateForFirstPressOfEqualButton.minus,
            callback: true
          }
        }) }
        const expectedActions = [
          calcMethodClear(),
          calcEqualActiveSet(true),
          calcMethodSet('minus'),
          calcEqualPrevMethodSet('minus'),
          calcMinusCallbackSet(false)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcResultGet())
      })

      it('should dispatch these actions on call of calcResultGet when add callback prop is true', (done) => {
        const mockState = { Calculator: Object.assign({}, mockStateForFirstPressOfEqualButton, {
          add: {...mockStateForFirstPressOfEqualButton.add,
            callback: true
          }
        }) }
        const expectedActions = [
          calcMethodClear(),
          calcEqualActiveSet(true),
          calcMethodSet('add'),
          calcEqualPrevMethodSet('add'),
          calcAddCallbackSet(false)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcResultGet())
      })
    })

    describe('calcReset', () => {
      it('should return a function', () => {
        expect(calcReset()).to.be.a('function')
      })

      it('should dispatch these actions on calling calcReset', (done) => {
        const mockState = { Calculator: {} }
        const expectedActions = [
          calcInputSet('0'),
          calcOutputSet('0'),
          calcNumberClear(),
          calcMethodClear(),
          calcOutputShouldClear(false),
          calcEqualActiveSet(false),
          calcEqualResultSet('0'),
          calcEqualVariableSet('0'),
          calcEqualPrevMethodSet(''),
          calcAddActiveSet(false),
          calcDotActiveSet(false),
          calcAddCallbackSet(false),
          calcMinusCallbackSet(false)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcReset())
      })
    })

    describe('calcEqual', () => {
      let initialState = {
        input: '2',
        numbers: [1],
        methodActive: 'add',
        add: {
          active: false,
          callback: false
        },
        minus: {
          active: false,
          calback: false
        },
        equal: {
          active: false,
          prevMethod: '',
          variable: 0,
          result: 0
        },
        dot: {
          active: false
        },
        outputClear: false,
        output: '2'
      }

      it('should return a function', () => {
        expect(calcEqual()).to.be.a('function')
      })

      it('should dispatch these actions on calling calcEqual when number array has 1 number', (done) => {
        const mockState = { Calculator: initialState }
        const expectedActions = [
          calcMethodSet('equal'),
          calcOutputShouldClear(true),
          calcNumberSave()
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcEqual())
      })

      it('should dispatch these actions on calling calcEqual when number array has 1 number, input empty. for use case (2 + = :: 4)', (done) => {
        const mockState = { Calculator: Object.assign({}, initialState, {
          input: ''
        }) }
        const expectedActions = [
          calcMethodSet('equal'),
          calcOutputShouldClear(true),
          calcInputSet('2'),
          calcNumberSave()
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcEqual())
      })
    })

  })
})