import { createAction, handleActions } from 'redux-actions'
// I'm using ajax jquery here because for some reason using fetch or xhr does not work with formspree
import $ from 'jquery'

/**
 * Constants
 */

export const CONTACT_NAME_SET = 'CONTACT_NAME_SET'
export const CONTACT_EMAIL_SET = 'CONTACT_EMAIL_SET'
export const CONTACT_MESSAGE_SET = 'CONTACT_MESSAGE_SET'
export const CONTACT_FORM_SUBMIT = 'CONTACT_FORM_SUBMIT'
export const CONTACT_FORM_SUCCESS = 'CONTACT_FORM_SUCCESS'
export const CONTACT_FORM_FAILURE = 'CONTACT_FORM_FAILURE'

/**
 * Actions
 */

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
  contactNameSet,
  contactEmailSet,
  contactMessageSet,
  contactFormSubmit
}
const initialState = {
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

/**
 * Reducer
 */

export const contactView = handleActions({
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