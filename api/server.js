const express = require('express');
const helmet = require('helmet');
const server = express();
const projectsRouter = require('./project/router')

server.use(helmet());
server.use(express.json());
server.use('/api/projects', projectsRouter);

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
});

module.exports = server;