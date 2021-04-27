'use strict'

const config = require('../config')
const store = require('../store')

const createTask = function (formData) {
  // set isComplete to always be false upon task creation
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

const readTasks = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/tasks',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const updateTask = function (formData, taskId) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + `/tasks/${taskId}`,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: formData
  })
}

const deleteTask = function () {

}

module.exports = {
  createTask,
  readTasks,
  updateTask,
  deleteTask
}
