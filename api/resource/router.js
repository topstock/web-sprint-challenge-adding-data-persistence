// build your `/api/resources` router here
const express = require('express')

const Resource = require('./model')

const router = express.Router()


// - [X] `[POST] /api/resources`
//   - Example of response body: `{"resource_id":1,"resource_name":"foo","resource_description":null}`

// - [X] `[GET] /api/resources`
//   - Example of response body: `[{"resource_id":1,"resource_name":"foo","resource_description":null}]`
router.post('/', async (req, res, next) => {
    const newResource = {
        resource_name: req.body.resource_name,
        resource_description: req.body.resource_description
    }
    const addedResource = await Resource.create(newResource)
    try {
      res.status(200).json(addedResource)
    } catch(err) {
      next(err)
    }
})

router.get('/', async (req, res, next) => {
    const resources = await Resource.find()
    try {
        res.status(200).json(resources)
    } catch(err) {
        next(err)
    }
})

module.exports = router