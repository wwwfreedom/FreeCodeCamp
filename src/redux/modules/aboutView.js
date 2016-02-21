import { createAction, handleActions } from 'redux-actions'

/**
 * Constants
 */

export const ABOUT_TITLE_GET = 'ABOUT_TITLE_GET'
export const ABOUT_INTRO_TEXT_GET = 'ABOUT_INTRO_TEXT_GET'

/**
 * Actions
 */

export const aboutTitleGet = createAction(ABOUT_TITLE_GET)
export const aboutIntroTextGet = createAction(ABOUT_INTRO_TEXT_GET)

export const actions = {
  aboutTitleGet,
  aboutIntroTextGet
}

const initialState = {
  about: {
    title: 'About Me',
    introText: "I'm a self-taught web developer based in Adelaide. My passion is to solve interesting problems using innovative web technologies. Lately, I've been making web applications with React.js. If you're interested in my work, check out my portfolio and say hi."
  },
  image: 'https://images.unsplash.com/photo-1438354886727-070458b3b5cf?crop=entropy&fit=crop&fm=jpg&h=825&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1450'
}

/**
 * Reducer
 */

export const aboutView = handleActions({
  ABOUT_TITLE_GET: (state) => state,

  ABOUT_INTRO_TEXT_GET: (state) => state
}, initialState)