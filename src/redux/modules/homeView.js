import { createAction, handleActions } from 'redux-actions'
import escaperoomsa from '../../../src/static/images/Escape Room SA.png'
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
      image: escaperoomsa,
      introText: 'A mobile optimize custom design business website',
      description: "I build this website for my business partner. The business has three requirements. Number one was accesibility, I custom design the website to display responsively across a variaty of devices. Number two was customer engagement, I added inbuilt mailing list sign up and custom contact form. The final requirement was performance, I optimize the website build process and was able to have average load time around 3 seconds on most modern devices."
    },
    {
      title: 'Pomo Time',
      link: 'pomoTime',
      image: 'http://lorempixel.com/image_output/sports-q-c-640-480-8.jpg',
      introText: 'A simple pomodoro timer built with React.js',
      description: "I build this application as a zipline project for Free Code Camp. The project requirement from Free Code Camp is to make a functional pomodoro timer. The focus of this app in on simplicity and displaying useful metric to keep the user motivated. "
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