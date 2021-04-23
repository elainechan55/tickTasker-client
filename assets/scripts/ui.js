'use strict'

const store = require('./store')

const onSignUpSuccess = function () {
  console.log('signup success')
  $('#message').text('Sign up successful!')
  $('#sign-up').trigger('reset')
}

const onSignInSuccess = function (response) {
  store.user = response.user
  console.log('signin success')
  $('#message').text('Sign in successful!')
  $('#sign-in').trigger('reset')
  $('.initial-forms').hide()
  $('#settings').css('visibility', 'visible')
  $('#new-game').show()
  $('#sign-out').show()
}

const onError = function (response) {
  console.log('there was an error')
  $('#message').text('There was an error, please try again.')
}

module.exports = {
  onSignUpSuccess,
  onSignInSuccess,
  onError
}
