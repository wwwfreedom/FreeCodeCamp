import { List, Map, is } from 'immutable'
// import util from 'util'

describe('chai-immutable', function () {
  it('can compare objects', function () {
    var a = Map({key: 'value'})
    var b = a.merge({key: 'value'})
    var c = a.merge({key: 'other value'})

    a.should.equal(b)
    expect(a).to.equal(b)
    a.should.not.equal(c)
  })
})

describe('immutability', function () {
  describe('a number', () => {
    function increment (currentState) {
      return currentState + 1
    }

    it('is immutable', () => {
      let state = 42
      let nextState = increment(state)

      expect(nextState).to.equal(43)
      expect(state).to.equal(42)
    })
  })

  describe('a list (same as array in javascript)', () => {
    function addLocations (currentState, location) {
      return currentState.push(location)
    }

    it('is immutable', () => {
      let state = List.of('Adelaide', 'Sydney')
      let nextState = addLocations(state, 'Melbourne')

      expect(is(nextState, List.of('Adelaide', 'Sydney', 'Melbourne'))).to.be.true
      expect(is(state, List.of('Adelaide', 'Sydney')))
      // expect(Map({ foo: 'bar', hello: 'universe' }).toJS()).to.include.keys('foo')
      // expect(List.of(1, 2, 3).toJS().length).to.equal(3)
    })
  })

  describe('a tree (same as object in javascript)', () => {
    function addLocations (currentState, location) {
      return currentState.update('locations', (locations) => locations.push(location))
    }

    it('is immutable', () => {
      let state = Map({
        locations: List.of('Adelaide', 'Sydney')
      })
      let nextState = addLocations(state, 'Melbourne')
      expect(is(nextState, Map({
        locations: List.of('Adelaide', 'Sydney', 'Melbourne')
      }))).to.be.true

      expect(is(state, Map({
        locations: List.of('Adelaide', 'Sydney')
      })))
      // expect(Map({ foo: 'bar', hello: 'universe' }).toJS()).to.include.keys('foo')
      // expect(List.of(1, 2, 3).toJS().length).to.equal(3)
    })
  })
})

