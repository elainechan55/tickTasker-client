'use strict'

const store = require('./store')

const onSignUpSuccess = function () {
  console.log('Sign up successful!')
  // $('#sign-up-message').text('Sign up successful!')
  // $('#sign-up-message').show()
  // $('#sign-up-message').delay(3500).fadeOut()
  showAndFadeMessageOn($('#sign-up-message'), 'Sign up successful!')
  $('#sign-up').trigger('reset')
}

const onSignUpError = function () {
  console.log('There was an error in sign-up')
  $('#sign-up-message').text('There was an error, please try again.')
}

const onSignInSuccess = function (response) {
  store.user = response.user
  console.log('Sign in successful!')
  showAndFadeMessageOn($('#message'), 'Sign in successful!')
  $('#sign-in').trigger('reset')
  $('.initial-forms').hide()
  $('#create-task').show()
  $('#settings').css('visibility', 'visible')
  $('#new-game').show()
  $('#sign-out').show()
}

const onChangePasswordClick = function () {
  $('#change-password').toggle()
}

const onChangePasswordSuccess = function () {
  console.log('Password change successful!')
  showAndFadeMessageOn($('#message'), 'Password change successful!')
  $('#change-password').trigger('reset')
  $('#change-password').hide()
}

const onSignOutSuccess = function () {
  console.log('Sign out successful!')
  showAndFadeMessageOn($('#message'), 'Sign out successful!')
  store.user = null
  $('.initial-forms').show()
  $('#create-task').hide()
  $('#settings').css('visibility', 'hidden')
}

const onError = function (response) {
  console.log('there was an error')
  $('#message').text('There was an error, please try again.')
}

function showAndFadeMessageOn (jQueryObject, message) {
  jQueryObject.text(message)
  jQueryObject.show()
  jQueryObject.delay(3500).fadeOut()
}

module.exports = {
  onSignUpSuccess,
  onSignUpError,
  onSignInSuccess,
  onChangePasswordClick,
  onChangePasswordSuccess,
  onSignOutSuccess,
  onError
}
