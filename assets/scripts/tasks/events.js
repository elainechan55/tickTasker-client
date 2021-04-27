'use strict'

const api = require('./api')
const ui = require('./../ui')
const getFormFields = require('./../../../lib/get-form-fields')
const store = require('./../store')

const onCreateTask = function (event) {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.createTask(formData)
    .then(ui.onCreateTaskSuccess)
    .then((response) => {
      // for every create task response, set event listener for update/edit
      // for every task, set event listener for checkbox -> update
      $(`#${response.task._id}`).on('submit', onUpdateTask)
      $(`#${response.task._id}-checkbox`).change(onCheckedTask)
    })
    .catch(ui.onError)
}

const onReadTasks = function () {
  api.readTasks()
    .then(ui.onReadTasksSuccess)
    .then(() => {
      // for every task, set event listener for update/edit
      // for every task, set event listener for checkbox -> update
      store.tasks.forEach(task => {
        $(`#${task._id}`).on('submit', onUpdateTask)
        $(`#${task._id}-checkbox`).change(onCheckedTask)
      })
    })
    .catch(ui.onError)
}

const onUpdateTask = function (event) {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  formData.task.isComplete = false

  api.updateTask(formData, form.id)
    .then(ui.onUpdateTaskSuccess)
    .catch(ui.onError)
}

const onCheckedTask = function (event) {
  event.preventDefault()

  // event.target.id === "bb32djsASjdaj-checkbox"
  const checkbox = event.target
  const taskId = checkbox.id.split('-')[0]
  const data = { task: { isComplete: checkbox.checked } }

  api.updateTask(data, taskId)
    .then(ui.onUpdateTaskSuccess)
    .catch(ui.onError)
}

const onDeleteTask = function (event) {
  event.preventDefault()

  api.deleteTask()
    .then(ui.onDeleteTaskSuccess)
    .catch(ui.onError)
}

module.exports = {
  onCreateTask,
  onReadTasks,
  onUpdateTask,
  onCheckedTask,
  onDeleteTask
}
