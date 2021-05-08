# Tick Tasker
A user-based site for creating and updating tasks that can be 'ticked' off when
completed. This application utilizes Bootstrap, HTML with SCSS and Javascript,
and AJAX API calls to the [TickTasker Server](https://github.com/elainechan55/tickTasker-server)
to view and track user tasks.

## Important Links
* [Other Repository](https://github.com/elainechan55/tickTasker-server)
* [Deployed API](https://tick-tasker.herokuapp.com/)
* [Deployed Client](https://elainechan55.github.io/tickTasker-client)


## Planning

### User Stories
MVP:
- As a user, I want to be able to create an account so that I can create tasks.
  - This is done when I am able to sign-up an account with an email, password,
  and password confirmation form fields.
- As a user, I want a log-in/sign-in button to be able to log into my created
account.
  - This is done when I am able to sign-in through the email and password form
  fields and clicking the sign-in button.
  - If credentials are not matched, reset field(s) and show a sign-in error.
- As a user, I want to be able to update my password for security issues.
  - This is done when I am able to change my password and see a message that says
  the password has been changed.
- As a user, I want to be able to create tasks and visually see them.
  - This is done when I see the task created.
- As a user, I want to be able to interact with the tasks by completing them.
  - This is done when I am able to 'tick' a task checkbox and see the change.
- As a user, I want to be able to delete tasks.
  - This is done when I am able to delete a task and visually see the change.
- As a user, I want to be able to sign-out.
  - This is done when I am no longer signed-in to my user after clicking the sign-
  out button and the page is set to show sign-in form fields.

STRETCH GOALS:
- As a user, I want to be able to share tasks with another user.
  - This is done when another user can view my tasks, or I can view another user's
  tasks after permission is given.
- As a user, I want to be able to interact with another user's tasks (if permitted).
  - This is done when I am able to 'tick' a task checkbox of another user or they
  can 'tick' a task checkbox of mine (if permitted).

### Technologies Used
- jQuery/AJAX
- HTML/SCSS
- Bootstrap
- Javascript

### Wireframes
![TickTasker Wireframe](/assets/images/tickTaskerWireframe.jpg)
