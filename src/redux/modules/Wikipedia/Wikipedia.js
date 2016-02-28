import {isEmpty} from 'lodash'

/**
 * resources
 * http://stackoverflow.com/questions/8363531/accessing-main-picture-of-wikipedia-page-by-api
 */
// using this because json-fetch doesn't support jsonp
import fetchJsonp from 'fetch-jsonp'
import { notifSend } from 'redux/modules/Notification/actions/notifs.js'

// ------------------------------------
// Constants
// ------------------------------------

export const SEARCH_INPUT_SET = 'SEARCH_INPUT_SET'
export const WIKI_SEARCH_REQUEST = 'WIKI_SEARCH_REQUEST'
export const WIKI_SEARCH_RECEIVE = 'WIKI_SEARCH_RECEIVE'
export const WIKI_SEARCH_FAILURE = 'WIKI_SEARCH_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const searchInputSet = (value = '') => ({
  type: SEARCH_INPUT_SET,
  payload: value
})

export const wikiSearchRequest = () => ({ type: WIKI_SEARCH_REQUEST })
export const wikiSearchFailure = () => ({ type: WIKI_SEARCH_FAILURE })

export const wikiSearchReceive = (articles) => ({
  type: WIKI_SEARCH_RECEIVE,
  payload: articles
})

/**
 * Thunk actions
 */

// lesson: using es7 async/await pattern
export const wikiFetch = () => async (dispatch, getState) => {
  dispatch(wikiSearchRequest())
  try {
    // get the search term from redux store
    var searchTerm = getState().wikipedia.searchInput
    // lesson: using jsonp because it's too cummbersome to use cors with wikipedia api
    var articles = await fetchJsonp(`http://simple.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${searchTerm}&pithumbsize=300&callback=JSON_CALLBACK`)
    // resolve the promise and convert parse response to an object
    .then(response => response.json())
    // convert the articles object properties into an array of object using es7
    // lesson: convert object properties to an array using es7 Object.values
    // http://stackoverflow.com/questions/6857468/a-better-way-to-convert-js-object-to-array
    .then(json => {
      // if wikipedia api does return a query object then return json object otherwise dispactch a wikiSearchFailure action
      // lesson: using es7 Object.values to return only the value of the object and not the property as an array
      if (json.query) {
        return Object.values(json.query.pages)
      } else {
        dispatch(wikiSearchFailure())
      }
    })

    // if articles is not empty then dispatch wikiSearchReceive
    if (isEmpty(articles) === false) {
      dispatch(wikiSearchReceive(articles))
    }
  } catch (error) {
    // for all other errors dispatch wikiSearchFailure
    console.log(error)
    // send popup if error
    dispatch(notifSend({
      message: "Something went wrong. Please refresh the page or go to wikipedia.org",
      kind: 'danger',
      dismissAfter: 5000
    }))
    dispatch(wikiSearchFailure())
  }
}

const shouldFetchWiki = (state) => {
  // if is fetching
  if (state.isFetching) {
    return false
  } else {
    return true
  }
}

export const fetchWikiIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchWiki(getState().wikipedia)) {
    dispatch(wikiFetch())
  }
}

export const actions = {
  searchInputSet,
  fetchWikiIfNeeded
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SEARCH_INPUT_SET]: (state, action) => Object.assign({}, state, {
    searchInput: action.payload
  }),

  [WIKI_SEARCH_REQUEST]: (state) => Object.assign({}, state, {
    isFetching: true,
    error: false
  }),

  [WIKI_SEARCH_RECEIVE]: (state, action) => Object.assign({}, state, {
    isFetching: false,
    articles: action.payload
  }),

  [WIKI_SEARCH_FAILURE]: (state) => Object.assign({}, state, {
    isFetching: false,
    error: true,
    articles: []
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  searchInput: '',
  articles: [],
  isFetching: false,
  error: true
}

export default function wikipedia(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}