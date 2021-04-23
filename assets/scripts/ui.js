'use strict'

const store = require('./store')

const onSignUpSuccess = function () {
  console.log('Sign up successful!')
  $('#sign-up-message').text('Sign up successful!')
  $('#sign-up').trigger('reset')
}

const onSignUpError = function () {
  console.log('There was an error in sign-up')
  $('#sign-up-message').text('There was an error, please try again.')
}

const onSignInSuccess = function (response) {
  store.user = response.user
  console.log('Sign in successful!')
  $('#message').text('Sign in successful!')
  $('#sign-in').trigger('reset')
  $('.initial-forms').hide()
  $('#settings').css('visibility', 'visible')
  $('#new-game').show()
  $('#sign-out').show()
}

const onChangePasswordClick = function () {
  $('#change-password').show()
}

const onChangePasswordSuccess = function () {
  console.log('Password change successful!')
  $('#message').text('Password change successful!')
  $('#change-password').trigger('reset')
  $('#change-password').hide()
}

const onSignOutSuccess = function () {
  console.log('Sign out successful!')
  $('#message').text('Sign out successful!')
  $('#message').delay(5000).fadeOut()
  store.user = null
  $('.initial-forms').show()
  $('#settings').css('visibility', 'hidden')
}

const onError = function (response) {
  console.log('there was an error')
  $('#message').text('There was an error, please try again.')
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
