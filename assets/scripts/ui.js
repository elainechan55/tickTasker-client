'use strict'

const store = require('./store')

// =============================================================================
// UI for authentication events (Sign-up, sign-in, change pw, sign-out)
const onSignUpSuccess = function () {
  showAndFadeMessageOn($('#sign-up-message'), 'Sign up successful!')
  $('#sign-up').trigger('reset')
}

const onSignUpError = function () {
  showAndFadeMessageOn($('#sign-up-message'), 'There was an error, please try again.')
}

const onSignInSuccess = function (response) {
  store.user = response.user
  showAndFadeMessageOn($('#message'), 'Sign in successful!')
  $('#sign-in').trigger('reset')
  $('.initial-forms').hide()
  $('#create-task-button').show()
  $('#settings').css('visibility', 'visible')
  $('#new-game').show()
  $('#sign-out').show()
  $('#task-collection').show()
}

const onChangePasswordClick = function () {
  $('#change-password').toggle()
}

const onChangePasswordSuccess = function () {
  showAndFadeMessageOn($('#message'), 'Password change successful!')
  $('#change-password').trigger('reset')
  $('#change-password').hide()
}

const onSignOutSuccess = function () {
  console.log('Sign out successful!')
  store.user = null
  $('.initial-forms').show()
  $('#create-task-button').hide()
  $('#settings').css('visibility', 'hidden')
  $('#task-collection').empty()
  showAndFadeMessageOn($('#message'), 'Sign out successful!')
}

// =============================================================================
// UI for task events (create task, read (INDEX) task, update task, delete task)
const onCreateTaskSuccess = function (response) {
  // push response.task to store.tasks
  store.tasks.push(response.task)
  $('#create-task-form').trigger('reset')
  $('#create-task-modal').modal('hide')
  // show in ui: created task
  // jQuery append HTML based on response of user's tasks to HTML (#task-collection) container
  const htmlString = createTaskHtml(response.task)
  const updateForm = createUpdateFormHtml(response.task)
  $('#task-collection').prepend(htmlString + updateForm)
  showAndFadeMessageOn($('#message'), 'Task created successfully!')

  return response
}

const onReadTasksSuccess = function (response) {
  // for loop through response.tasks
  // for each task, append html to board
  store.tasks = response.tasks

  reloadTasksFromStore()
}

const onUpdateTaskSuccess = function (response) {
  // console.log(response.task._id)
  // console.log(response)

  // update from modal response to post-it
  $(`#${response.task._id}-title`).text(response.task.title)
  $(`#${response.task._id}-description`).text(response.task.description)

  $(`#${response.task._id}-checkbox`).checked = response.task.isComplete

  store.tasks.forEach((task, i) => {
    if (task._id === response.task._id) {
      store.tasks[i] = response.task
    }
  })

  reloadTasksFromStore()

  $(`#update-task-modal-${response.task._id}`).modal('hide')
  showAndFadeMessageOn($('#message'), 'Task updated successfully!')
}

const onDeleteTaskSuccess = function (taskId) {
  showAndFadeMessageOn($('#message'), 'Task deleted successfully!')
  $(`#${taskId}-div`).remove()
}

// =============================================================================
// UI for error
const onError = function (response) {
  $('#message').text('There was an error, please try again.')
}

// =============================================================================
// local functions
// function for showing messages (with fade out on 3.5 sec)
function showAndFadeMessageOn (jQueryObject, message) {
  jQueryObject.text(message)
  jQueryObject.show()
  jQueryObject.delay(3500).fadeOut()
}

// function to create a task with HTML and insert with responses
function createTaskHtml (task) {
  let checked = ''
  // if task.isComplete = true, add 'checked' to checkbox-HTML-element
  if (task.isComplete) {
    checked = 'checked'
  }
  // This is the created post-it on the board (every created one)
  // using html ids to map to back-end task IDs making updates possible
  return `<div class="col-sm-12 col-md-3 col-lg-3 task-post-outline-read" id="${task._id}-div">
    <div>
      <p class="text-center task-post-outline-title" id="${task._id}-title">${task.title}</p>
    </div>
    <div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="${task._id}-checkbox" ${checked}>
        <label class="form-check-label task-post-outline-description" for="task-post-outline-checkbox" id="${task._id}-description">
          ${task.description}
        </label>
      </div>
    </div>
    <div>
      <div>
        <button type="button" class="btn btn-primary float-right delete-task-button" id="${task._id}-deleteButton">
          Delete task
        </button>
      </div>
      <div>
        <button type="button" class="btn btn-primary float-right edit-task-button" data-toggle="modal" data-target="#update-task-modal-${task._id}">
          Edit task
        </button>
      </div>
    </div>
  </div>`
}

function createUpdateFormHtml (task) {
  // finding specific modal for update
  return `<div id="update-task-modal-${task._id}" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <!--to update specific task-->
        <form id="${task._id}">
          <div class="modal-header">
            <input name="task[title]" type="text" class="form-control create-update-title" value='${task.title}' autofocus required>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input name="task[description]" type="text" class="form-control create-update-description" value='${task.description}' required>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary update-save-button">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>`
}

function reloadTasksFromStore () {
  // $('#task-collection').empty()
  const completedTasks = store.tasks.filter(task => task.isComplete)
  const uncompletedTasks = store.tasks.filter(task => !task.isComplete)

  uncompletedTasks.forEach(task => {
    const taskDiv = $(`#${task._id}-div`)

    if (taskDiv.length) {
      $('#task-collection').prepend(taskDiv)
    } else {
      const htmlString = createTaskHtml(task)
      const updateForm = createUpdateFormHtml(task)
      // append/inject into task-collection div
      $('#task-collection').prepend(htmlString + updateForm)
    }
  })

  completedTasks.forEach(task => {
    const taskDiv = $(`#${task._id}-div`)

    if (taskDiv.length) {
      $('#task-collection').append(taskDiv)
    } else {
      const htmlString = createTaskHtml(task)
      const updateForm = createUpdateFormHtml(task)
      // append/inject into task-collection div
      $('#task-collection').append(htmlString + updateForm)
    }
  })
}

module.exports = {
  onSignUpSuccess,
  onSignUpError,
  onSignInSuccess,
  onChangePasswordClick,
  onChangePasswordSuccess,
  onSignOutSuccess,
  onCreateTaskSuccess,
  onReadTasksSuccess,
  onUpdateTaskSuccess,
  onDeleteTaskSuccess,
  onError
}
