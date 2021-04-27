'use strict'

// in store: user, tasks
/*
{
"user": {
    "_id": "<id>",
    "email": "<email>",
    "createdAt": "<date>",
    "updatedAt": "<date>",
    "__v":0,
    "token": "<token>"
  }
}
[{
  task = {
    "_id":
    "title":
    "description":
    "isComplete":
    "owner":
    "createdAt":
    "updatedAt":
    "_v:0"
  }
}]
*/

const store = {
  tasks: []
}

module.exports = store
