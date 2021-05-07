'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

const authEvents = require('./auth/events')
const taskEvents = require('./tasks/events')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#create-task-button').hide()
  $('#settings').css('visibility', 'hidden')
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('.menu-change-password').on('click', authEvents.onChangePasswordClick)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('#create-task-form').on('submit', taskEvents.onCreateTask)
  $('#create-task-modal').on('shown.bs.modal', function () {
    $('#create-title-input').focus()
  })
})
