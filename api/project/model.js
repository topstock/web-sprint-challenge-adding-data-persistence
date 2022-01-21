// build your `Project` model here
const db = require('../../data/dbConfig')

function find() {
  return db('projects as p')
    .join('resources as r', 'p.project_id', 'r.project_id')
    .join('tasks as ta', 'p.project_id', 'ta.project_id')
}

async function findById() {
    
}

module.exports = {
    find,
    findById
}