import { createAction, handleActions } from 'redux-actions'

/**
 * Constants
 */
export const HEADER_IMAGE_GET = 'HEADER_IMAGE_GET'
export const HEADER_TEXT_GET = 'HEADER_TEXT_GET'

/**
 * Actions only export const is send as props while those not exported are local action to be use by thunk action
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
  headerImage: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?crop=entropy&fit=crop&fm=jpg&h=825&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1450',
  headerText: "Hello, I'm Kevin.",
  headerParagraph: "I'm a web developer specializing in building interactive web apps.",
  portfolio: [
    {
      title: 'Pollwise',
      link: 'https://pollwise.herokuapp.com/',
      image: 'http://i.imgur.com/8zcWJpJ.png',
      brief: 'To build a full stack polling app where users can create and share their own polls.',
      role: "Developing the front-end of the app with React.js and Redux. Creating a custom user registration system with OAuth logins and persist user's generated content to MongoDb."
    },
    {
      title: 'Escape Room SA',
      link: 'http://escaperoomsa.com.au/',
      image: 'http://i.imgur.com/HQmLQbA.png',
      brief: 'To create a fast loading responsive website to showcase brand and identity guidelines.',
      role: 'Developing all HTML, CSS and Javascript assets for project, based on a custom design created in-house.'
    },
    {
      title: 'Pomo Time',
      link: 'pomoTime',
      image: 'http://i.imgur.com/vvEZbX8.png',
      brief: 'To create a pomodoro timer with simple elegant design.',
      role: 'Developing all timer features with React.js and Redux for state management. Creating responsive SVG design and animations.'
    }
  ]
}

export const homeView = handleActions({
  HEADER_TEXT_GET: (state) => Object.assign({}, state, {
    headerText: state.headerText
  }),

  HEADER_IMAGE_GET: (state) => Object.assign({}, state, {
    headerImage: state.headerImage
  })
}, initialState)
