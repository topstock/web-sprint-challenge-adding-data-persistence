// build your `/api/projects` router here
const express = require('express')

const Project = require('./model')

const router = express.Router()


// - [X] `[POST] /api/projects`
//   - Example of response body: `{"project_id":1,"project_name":"foo","project_description":null}`

// - [X] `[GET] /api/projects`
//   - Example of response body: `[{"project_id":1,"project_name":"foo","project_description":null}]`
router.post('/', async (req, res, next) => {
    const newProject = {
        project_name: req.body.project_name,
        project_description: req.body.project_description,
        project_completed: req.body.project_completed
    }
    const addedProject = await Project.create(newProject)
    try {
      addedProject.project_completed = !(!addedProject.project_completed)
      res.status(200).json(addedProject)
    } catch(err) {
      next(err)
    }
})

router.get('/', async (req, res, next) => {
    const projects = await Project.find()
    try {
        booleanHavingProjects = projects.map(project => {
            return { ...project, project_completed: !(!project.project_completed)}
        })
        res.status(200).json(booleanHavingProjects)
    } catch(err) {
        next(err)
    }
})

module.exports = router

//example:  http :5000/api/projects project_name="stacking things"