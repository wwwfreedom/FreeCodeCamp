import { createAction, handleActions } from 'redux-actions'

/**
 * Constants
 */
export const HEADER_IMAGE_GET = 'HEADER_IMAGE_GET'
export const HEADER_TEXT_GET = 'HEADER_TEXT_GET'

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
  headerParagraph: "I build things for the internet",
  section: {
    about: {
      title: 'About Me',
      text: "I'm a self taught web developer based in Adelaide. My passion is to solve interesting problems using innovative web technologies. Lately, I've been developing with React.js. If you're interested in my work, check out my portfolio and say hi."
    }
  },
  portfolio: [
    {
      title: 'Escape Room SA',
      link: 'http://escaperoomsa.com.au/',
      image: 'http://lorempixel.com/image_output/animals-q-c-640-480-3.jpg',
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