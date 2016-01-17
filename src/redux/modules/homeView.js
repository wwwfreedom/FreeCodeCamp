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
  headerParagraph: "I build things for the internet",
  portfolio: [
    {
      title: 'Escape Room SA',
      link: 'http://escaperoomsa.com.au/',
      image: 'http://i.imgur.com/HQmLQbA.png',
      introText: 'A mobile optimizes custom design business website',
      description: "The website number one feature was accessibility, it was designed to display responsively across a variety of devices. It featured inbuilt mailing list sign up and custom contact form. The website build process was optimized to achieve average load time around three seconds on most modern devices."
    },
    {
      title: 'Pomo Time',
      link: 'pomoTime',
      image: 'http://lorempixel.com/image_output/sports-q-c-640-480-8.jpg',
      introText: 'A simple pomodoro timer built with React.js',
      description: "I build this application as a zipline project for Free Code Camp. The project requirement from Free Code Camp is to make a functional Pomodoro timer. The focus of this app in on simplicity and displaying useful metric to keep the user motivated."
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