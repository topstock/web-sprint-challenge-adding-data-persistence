// build your `/api/projects` router here
const express = require('express')
const project = require('./model')

const router = express.Router()

router.get('/', (req, res, next) => {
    project.find()
      .then(projects => {
          res.json(projects)
      })
      .catch(next)
})

router.get('/:id', () => {
    project.findById(req.params.id)
      .then(project => {
          res.json(project)
      })
      .catch(next)
})

module.exports = router