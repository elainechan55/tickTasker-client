'use strict'

const config = require('../config')
const store = require('../store')

const createTask = function (formData) {
  formData.task.isComplete = false
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/tasks',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: formData
  })
}

module.exports = {
  createTask
}
