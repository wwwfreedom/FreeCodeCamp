import { createAction, handleActions } from 'redux-actions'
import quotes from '../data/quotes.js'

/**
 * Constants
 */

export const QUOTE_GET = 'QUOTE_GET'

/**
 * Actions
 */

export const quoteGet = createAction(QUOTE_GET, value => value)

// return quote that's not the same consecutively (thunk action)
export const quoteGetNoDupes = () => (dispatch, getState) => {
  let currentQuote = getState().QuoteView.quote.text
  let nextQuote = randomQuote(quotes)
  if (currentQuote === nextQuote.text) {
    // console.log('duplicate', currentQuote, nextQuote)
    nextQuote = randomQuote(quotes)
  } else {
    // console.log(currentQuote !== nextQuote)
    dispatch(quoteGet(nextQuote))
  }
}

export const actions = {
  quoteGetNoDupes
}

/**
 * Reducer
 */

function randomQuote (array) {
  return array[Math.floor(Math.random() * array.length)]
}

const initialState = {
  quote: randomQuote(quotes)
}

export const QuoteView = handleActions({
  QUOTE_GET: (state, { payload }) => Object.assign({}, state, {
    quote: payload
  })
}, initialState)