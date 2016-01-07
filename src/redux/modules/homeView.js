import { createAction, handleActions } from 'redux-actions'

/**
 * Constants
 */
export const HEADER_IMAGE_GET = HEADER_IMAGE_GET
export const HEADER_TEXT_GET = HEADER_TEXT_GET

/**
 * Actions
 */
export const headerImageGet = createAction(HEADER_IMAGE_GET)
export const headerTextGet = createAction(HEADER_TEXT_GET)

export const actions = {
  headerImageGet,
  headerTextGet
}

/**
 * Reducer
 */
const initialState = {
  headerImage: require('../../static/images/road.jpg'),
  headerText: "Hello, I'm Kevin.",
  headerParagraph: "I build things for the internet"
}

export const homeView = handleActions({
  HEADER_TEXT_GET: (state) => Object.assign({}, state, {
    headerText: state.headerText
  }),

  HEADER_IMAGE_GET: (state) => Object.assign({}, state, {
    headerImage: state.headerImage
  })
}, initialState)