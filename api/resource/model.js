// build your `Resource` model here
const db = require('../../data/dbConfig')
async function create(newResource) {
  const {resource_name, resource_description} = newResource
  const newIds = await db('resources')
    .insert({
        resource_name: resource_name,
        resource_description: resource_description
      })

    return db('resources').where('resource_id', newIds[0]).first()
    
}
function find() {
    return db('resources')
}
module.exports = {
    create,
    find
}