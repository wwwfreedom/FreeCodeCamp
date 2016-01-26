import { Calculator, CALC_OUTPUT_CLEAR, calcOutputClear, CALC_OUTPUT_SET, calcOutputSet, CALC_OUTPUT_UPDATE, calcOutputUpdate, CALC_OUTPUT_SHOULD_CLEAR, calcOutputShouldClear, CALC_INPUT_CLEAR, calcInputClear, CALC_INPUT_UPDATE, calcInputUpdate, CALC_NUMBER_SAVE, calcNumberSave, CALC_NUMBER_CLEAR, calcNumberClear, CALC_METHOD_SET, calcMethodSet, CALC_METHOD_CLEAR, calcMethodClear, CALC_EQUAL_ACTIVE_SET, calcEqualActiveSet, CALC_EQUAL_VARIABLE_SET, calcEqualVariableSet, CALC_EQUAL_PREV_METHOD_SET, calcEqualPrevMethodSet, CALC_EQUAL_RESULT_SET, calcEqualResultSet, calcAdd, calcButtonClick, calcResultGet, calcEqualResultUpdate, CALC_EQUAL_RESULT_UPDATE, calcReset } from 'redux/modules/Calculator/Calculator.js'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('(Redux) Calculator ', () => {
  // Reducer tests
  describe('Reducer', () => {
    let initialState = {
      input: '2',
      numbers: [1],
      methods: {
        current: ''
      },
      equal: {
        active: false,
        prevMethod: '',
        variable: 0,
        result: 1
      },
      outputClear: false,
      output: 'test'
    }

    it('should clear the output on calling calcOutputClear', () => {
      expect(Calculator(initialState, calcOutputClear())).to.eql(Object.assign({}, initialState, { output: '' }))
    })

    it('should set the right output on calling calcOutputSet', () => {
      expect(Calculator(initialState, calcOutputSet('test'))).to.eql(Object.assign({}, initialState, { output: 'test' }))
    })

    it('should update the output on calling calcOutputUpdate', () => {
      expect(Calculator(initialState, calcOutputUpdate('moretest'))).to.eql(Object.assign({}, initialState, { output: 'testmoretest' }))
    })

    it('should set right outputClear value on calling calcOutputShouldClear', () => {
      expect(Calculator(initialState, calcOutputShouldClear(true))).to.eql(Object.assign({}, initialState, { outputClear: true }))
    })

    it('should set empty input on calling calcInputClear', () => {
      expect(Calculator(initialState, calcInputClear())).to.eql(Object.assign({}, initialState, { input: '' }))
    })

    it('should update input on calling calcInputUpdate', () => {
      expect(Calculator(initialState, calcInputUpdate('test1'))).to.eql(Object.assign({}, initialState, { input: '2test1' }))
    })

    it('should set right numbers on calling calcNumberSave', () => {
      expect(Calculator(initialState, calcNumberSave())).to.eql(Object.assign({}, initialState, {numbers: [1, 2]}))
    })

    it('should set right numbers on calling calcNumberClear', () => {
      expect(Calculator(initialState, calcNumberClear())).to.eql(Object.assign({}, initialState, {numbers: []}))
    })

    it('should set right method on calling calcMethodSet', () => {
      expect(Calculator(initialState, calcMethodSet('add'))).to.eql(Object.assign({}, initialState, {methods: {current: 'add'}}))
    })

    it('should set right method on calling calcMethodClear', () => {
      expect(Calculator(initialState, calcMethodClear())).to.eql(Object.assign({}, initialState, {methods: {current: ''}}))
    })

    it('should set equal to active on calling calcEqualActiveSet', () => {
      expect(Calculator(initialState, calcEqualActiveSet(true))).to.eql(Object.assign({}, initialState, {equal: {...initialState.equal, active: true}}))
    })

    it('should set equal variable on calling calcEqualVariableSet', () => {
      expect(Calculator(initialState, calcEqualVariableSet(2))).to.eql(Object.assign({}, initialState, {equal: {...initialState.equal, variable: 2}}))
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
  })

  /**
   * // Actions test
   */

  describe('Actions', () => {
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

    describe('calcOutputUpdate', () => {
      it('should create a CALC_OUTPUT_UPDATE action', () => {
        expect(calcOutputUpdate('test1')).to.eql({type: CALC_OUTPUT_UPDATE, payload: 'test1'})
      })
    })

    describe('calcOutputShouldClear', () => {
      it('should create a CALC_OUTPUT_SHOULD_CLEAR action', () => {
        expect(calcOutputShouldClear(false)).to.eql({type: CALC_OUTPUT_SHOULD_CLEAR, payload: false})
      })
    })

    describe('calcInputClear', () => {
      it('should create a CALC_INPUT_CLEAR action', () => {
        expect(calcInputClear()).to.eql({type: CALC_INPUT_CLEAR, payload: undefined})
      })
    })

    describe('calcInputUpdate', () => {
      it('should create a CALC_INPUT_UPDATE action', () => {
        expect(calcInputUpdate('test')).to.eql({type: CALC_INPUT_UPDATE, payload: 'test'})
      })
    })

    describe('calcNumberSave', () => {
      it('should create a CALC_NUMBER_SAVE action', () => {
        expect(calcNumberSave()).to.eql({type: CALC_NUMBER_SAVE, payload: undefined})
      })
    })

    describe('calcNumberClear', () => {
      it('should create a CALC_NUMBER_CLEAR action', () => {
        expect(calcNumberClear()).to.eql({type: CALC_NUMBER_CLEAR, payload: undefined})
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

    describe('calcEqualActiveSet', () => {
      it('should create a CALC_EQUAL_ACTIVE_SET action', () => {
        expect(calcEqualActiveSet(true)).to.eql({type: CALC_EQUAL_ACTIVE_SET, payload: true})
      })
    })

    describe('calcEqualVariableSet', () => {
      it('should create a CALC_EQUAL_VARIABLE_SET action', () => {
        expect(calcEqualVariableSet(10)).to.eql({type: CALC_EQUAL_VARIABLE_SET, payload: 10})
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
  })

  /**
   * Thunk actions
   */
  describe('Thunk actions', () => {
    describe('calcAdd', () => {
      let initialState = {
        methods: {
          current: ''
        }
      }
      it('should return a function', () => {
        expect(calcAdd()).to.be.a('function')
      })

      // this test will timeOut if the method is not add
      it('should dispatch these action when currentMethod is not "add"', (done) => {
        const mockState = {Calculator: initialState}
        const expectedActions = [
          calcNumberSave(),
          calcInputClear(),
          calcMethodSet('add'),
          calcEqualActiveSet(false),
          calcOutputShouldClear(true)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcAdd())
      })
    })

    describe('calcButtonClick', () => {
      it('should return a function', () => {
        expect(calcButtonClick()).to.be.a('function')
      })

      it('should dispatch these action on calling calcButtonClick', (done) => {
        const mockState = { Calculator: { outputClear: false } }
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
          calcOutputShouldClear(false),
          calcOutputUpdate(1),
          calcInputUpdate(1)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcButtonClick(1))
      })
    })

    describe('calcResultGet', () => {
      let mockStateForFirstPressOfEqualButton = {
        input: '2',
        numbers: [1, 2],
        methods: {
          current: 'add'
        },
        equal: {
          active: false,
          prevMethod: '',
          variable: 0,
          result: 0
        },
        outputClear: false,
        output: 'test'
      }

      let mockStateForSubsequentPressOfEqualButton = {
        input: '2',
        numbers: [1, 2],
        methods: {
          current: ''
        },
        equal: {
          active: true,
          prevMethod: 'add',
          variable: 2,
          result: 5
        },
        outputClear: false,
        output: 'test'
      }

      it('should return a function', () => {
        expect(calcResultGet()).to.be.a('function')
      })

      it('should dispatch these actions on calling calcResultGet', (done) => {
        const mockState = { Calculator: mockStateForFirstPressOfEqualButton }
        const expectedActions = [
          calcNumberSave(),
          calcMethodClear(),
          calcEqualActiveSet(true),
          calcEqualVariableSet(2),
          calcEqualPrevMethodSet('add'),
          calcEqualResultSet(3),
          calcEqualActiveSet(false),
          calcOutputSet(3),
          calcInputClear(),
          calcNumberClear(),
          calcOutputShouldClear(true)
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcResultGet())
      })

      it('should dispatch these actions on subsequent call of calcResultGet i.e. when user press = button again', (done) => {
        const mockState = { Calculator: mockStateForSubsequentPressOfEqualButton }
        const expectedActions = [
          calcNumberSave(),
          calcMethodClear(),
          calcEqualActiveSet(true),
          calcEqualResultUpdate(2),
          calcOutputSet(5),
          calcInputClear(),
          calcNumberClear(),
          calcOutputShouldClear(true)
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
          calcOutputClear(),
          calcInputClear(),
          calcNumberClear(),
          calcMethodClear(),
          calcOutputShouldClear(false),
          calcEqualActiveSet(false),
          calcEqualResultSet(0),
          calcEqualVariableSet(0),
          calcEqualPrevMethodSet('')
        ]

        const store = mockStore(mockState, expectedActions, done)
        store.dispatch(calcReset())
      })
    })

  })
})