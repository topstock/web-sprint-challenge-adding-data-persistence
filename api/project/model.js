// build your `Project` model here
const db = require('../../data/dbConfig')
async function create(newProject) {
  const {project_name, project_description, project_completed} = newProject
  const newIds = await db('projects')
    .insert({
        project_name: project_name,
        project_description: project_description,
        project_completed: project_completed

      })

    return db('projects').where('project_id', newIds[0]).first()
    
}
function find() {
    return db('projects')
}
module.exports = {
    create,
    find
}