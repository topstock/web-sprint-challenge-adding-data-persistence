// build your server here and require it from index.js
const express = require('express')

const server = express()

const projectsRouter = require('./project/router')

server.use(express.json())

server.use('/', projectsRouter)

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message})
})

module.exports = server