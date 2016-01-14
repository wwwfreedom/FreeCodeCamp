import { createAction, handleActions } from 'redux-actions'
// I'm using ajax jquery here because for some reason using fetch or xhr does not work with formspree
import $ from 'jquery'
/**
 * Constants
 */
export const HEADER_IMAGE_GET = 'HEADER_IMAGE_GET'
export const HEADER_TEXT_GET = 'HEADER_TEXT_GET'
export const CONTACT_NAME_SET = 'CONTACT_NAME_SET'
export const CONTACT_EMAIL_SET = 'CONTACT_EMAIL_SET'
export const CONTACT_MESSAGE_SET = 'CONTACT_MESSAGE_SET'
export const CONTACT_FORM_SUBMIT = 'CONTACT_FORM_SUBMIT'
export const CONTACT_FORM_SUCCESS = 'CONTACT_FORM_SUCCESS'
export const CONTACT_FORM_FAILURE = 'CONTACT_FORM_FAILURE'

/**
 * Actions only export const is send as props while those not exported are local action to be use by thunk action
 */
export const headerImageGet = createAction(HEADER_IMAGE_GET)
export const headerTextGet = createAction(HEADER_TEXT_GET)
export const contactNameSet = createAction(CONTACT_NAME_SET, (value) => value)
export const contactEmailSet = createAction(CONTACT_EMAIL_SET, (value) => value)
export const contactMessageSet = createAction(CONTACT_MESSAGE_SET, (value) => value)
const receiveFormSuccess = createAction(CONTACT_FORM_SUCCESS, (value) => value)
const receiveFormFailure = createAction(CONTACT_FORM_FAILURE, (value) => value)

// this is a thunk action (asyn operation)
export const contactFormSubmit = (payload) => {
  return (dispatch, getState) => {
    $.ajax({
      type: 'POST',
      url: 'http://formspree.io/tig3r86@gmail.com',
      data: `name=${payload.name}&email=${payload.email}&textarea=${payload.message}&_gotcha=`,
      dataType: 'json',
      success: function (data) {
        dispatch(receiveFormSuccess(data))
      },
      error: function (err) {
        dispatch(receiveFormFailure(err))
      }
    })
    // // var request = new Request('http://formspree.io/tig3r86@gmail.com', {
    // //   method: 'POST',
    // //   body: 'name=asfs&email=Kevin%40hotmail.com&textarea=adfasdf&_gotcha=',
    // //   mode: 'cors',
    // //   headers: new Headers({
    // //     'Content-Type': 'application/json'
    // //   }),
    // //   referrer: 'http://localhost:3000/origin-when-cross-origin'
    // // })
    // // fetch(request).then(function (response) {
    // //   console.log(response)
    // //   // dispatch(receiveFormSuccess(response))
    // // }).catch(function (error) {
    // //   console.log(error)
    // // })

    // var xhr = new XMLHttpRequest()
    // xhr.open('POST', 'http://formspree.io/tig3r86@gmail.com', true)
    // xhr.responseType = 'json'

    // xhr.onload = function() {
    //   console.log(xhr.response)
    // }

    // xhr.onerror = function() {
    //   console.log("Booo")
    // }

    // xhr.send(`name=${payload.name}&email=${payload.email}&textarea=${payload.message}&_gotcha=`)
  }
}

export const actions = {
  headerImageGet,
  headerTextGet,
  contactNameSet,
  contactEmailSet,
  contactMessageSet,
  contactFormSubmit
}

/**
 * Reducer
 */
const initialState = {
  headerImage: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?crop=entropy&fit=crop&fm=jpg&h=825&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1450',
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
  ],
  contact: {
    github: 'https://github.com/wwwfreedom',
    codepen: 'http://codepen.io/wwwfreedom/',
    fcc: 'http://www.freecodecamp.com/wwwfreedom',
    map: 'http://maps.googleapis.com/maps/api/staticmap?center=Richmond+south+australia&zoom=12&scale=2&size=600x300&maptype=roadmap&format=png&visual_refresh=true',
    formInput: {
      name: '',
      namePlaceholder: 'How should I call you?',
      // might not even need the email
      email: '',
      emailPlaceholder: 'Please enter your email...',
      messagePlaceholder: 'What would you like to say?',
      message: ''
    },
    formStatus: {
      submitted: false,
      response: '',
      error: false
    }
  }
}

export const homeView = handleActions({
  HEADER_TEXT_GET: (state) => Object.assign({}, state, {
    headerText: state.headerText
  }),

  HEADER_IMAGE_GET: (state) => Object.assign({}, state, {
    headerImage: state.headerImage
  }),

  CONTACT_NAME_SET: (state, { payload }) => Object.assign({}, state, {
    contact: {...state.contact,
      formInput: {
        ...state.contact.formInput,
        name: payload
      }
    }
  }),

  CONTACT_EMAIL_SET: (state, { payload }) => Object.assign({}, state, {
    contact: {...state.contact,
      formInput: {
        ...state.contact.formInput,
        email: payload
      }
    }
  }),

  CONTACT_MESSAGE_SET: (state, { payload }) => Object.assign({}, state, {
    contact: {...state.contact,
      formInput: {
        ...state.contact.formInput,
        message: payload
      }
    }
  }),

  CONTACT_FORM_SUCCESS: (state, { payload }) => Object.assign({}, state, {
    contact: {...state.contact,
      formInput: {
        ...state.contact.formInput,
        name: '',
        email: '',
        message: ''
      },
      formStatus: {
        ...state.contact.formStatus,
        response: "Email sent, I'll get back to you soon",
        submitted: true
      }
    }
  }),

  CONTACT_FORM_FAILURE: (state, { payload }) => Object.assign({}, state, {
    contact: {...state.contact,
      formStatus: {
        ...state.contact.formStatus,
        response: "There's a server error, please refresh and try again later",
        submitted: false,
        error: true
      }
    }
  })
}, initialState)