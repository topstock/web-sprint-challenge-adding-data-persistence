// build your `Task` model here
const db = require('../../data/dbConfig')
async function create(newTask) {
  const { task_description, task_notes, task_completed, project_id } = newTask
  const newIds = await db('tasks')
    .insert({
        task_description: task_description,
        task_notes: task_notes,
        task_completed: task_completed,
        project_id: project_id,
      })

  return db('tasks').where('task_id', newIds[0]).first()
}

function find() {
    return db('tasks')
}

module.exports = {
    create,
    find
}