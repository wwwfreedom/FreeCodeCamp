import { QuoteView, quoteGetNoDupes, quoteGet, QUOTE_GET } from 'redux/modules/QuoteView'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('(Redux) QuoteView', () => {
  // Reducer tests
  describe('Reducer', () => {
    let initialState = {
      quote: {
        author: 'testAuthor',
        text: 'testText',
        'image-src': 'testImage'
      }
    }
    let payload = {
      author: 'payloadAuthor',
      text: 'payloadText',
      'image-src': 'payloadImage'
    }

    it('should return the right state', () => {
      expect(QuoteView(initialState, {type: 'QUOTE_GET', payload: payload})).to.eql({quote: payload})
    })
  })
  // Actions test
  describe('Actions', () => {
    describe('quoteGet', () => {
      let payload = {
        author: 'payloadAuthor',
        text: 'payloadText',
        'image-src': 'payloadImage'
      }
      it('should create a QUOTE_GET action with the right payload', () => {
        expect(quoteGet(payload)).to.eql({type: QUOTE_GET, payload: payload})
      })
    })

    describe('quoteGetNoDupes', () => {
      let initialState = {
        quote: {
          author: 'testAuthor',
          text: 'testText',
          'image-src': 'testImage'
        }
      }
      it('should return a function', () => {
        expect(quoteGetNoDupes()).to.be.a('function')
      })

      it('should dispatch a quoteGet action', (done) => {
        const getState = { QuoteView: initialState }
        const expectedActions = [(incomingAction) => {
          // check for QUOTE_GET action only
          if (incomingAction.type !== QUOTE_GET) {
            throw Error('Expected action of type QUOTE_GET')
          }
        }]

        const store = mockStore(getState, expectedActions, done)
        store.dispatch(quoteGetNoDupes())
      })
    })
  })
})

