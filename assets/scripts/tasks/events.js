'use strict'

const api = require('./api')
const ui = require('./../ui')
const getFormFields = require('./../../../lib/get-form-fields')
// const store = require('./store')

const onCreateTask = function (event) {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.createTask(formData)
    .then(ui.onCreateTaskSuccess)
    .catch(ui.onError)
}

module.exports = {
  onCreateTask
}
