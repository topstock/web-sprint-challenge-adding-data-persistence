// build your `Task` model here
const db = require('../../data/dbConfig')
function create(newTask) {
    const {task_name, task_description} = newTask
    return db('tasks')
      .insert({
          task_name: task_name,
          task_description: task_description || null
        })
      .then( function (result) {
        const newId = result[0]
        db('tasks').where('task_id', newId).first()
      })
}
function find() {
    return db('tasks')
}
module.exports = {
    create,
    find
}