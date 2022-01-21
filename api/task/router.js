// build your `/api/tasks` router here
const express = require('express')

const Task = require('./model')

const router = express.Router()
router.post('/', async (req, res, next) => {
    const newTask = await Task.create()
    try {
      res.status(200).json(newTask)
    } catch(err) {
        next(err)
    }
})

router.get('/', async (req, res, next) => {
    const tasks = await Task.find()
    try {
        res.status(200).json(tasks)
    } catch(err) {
        next(err)
    }
})

module.exports = router