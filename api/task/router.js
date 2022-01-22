// build your `/api/tasks` router here
const express = require('express')

const Task = require('./model')

const router = express.Router()

router.post('/', async (req, res, next) => {
    const newTask = {
        task_description: req.body.task_description,
        task_notes: req.body.task_notes,
        task_completed: req.body.task_completed,
        project_id: req.body.project_id
    }
    const addedTask = await Task.create(newTask)
    try {
      const booleCompleted = !(!req.body.task_completed)
      addedTask.task_completed = booleCompleted
      res.status(200).json(addedTask)
    } catch(err) {
      next(err)
    }
})

router.get('/', async (req, res, next) => {
    const tasks = await Task.find()
    try {
        booleanHavingTasks = tasks.map(task => {
            return { ...task, task_completed: !(!task.task_completed)}
        })
        res.status(200).json(booleanHavingTasks)
    } catch(err) {
        next(err)
    }
})

module.exports = router
//example:  http :5000/api/tasks task_notes="prepare" task_description="pick it all up" project_id:=1