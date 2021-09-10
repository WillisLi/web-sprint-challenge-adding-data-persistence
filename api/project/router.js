// build your `/api/projects` router here
const router = require('express').Router();
const Projects = require('./model')

router.get('/', (req, res, next) => {
    Projects.getProjects()
        .then(projectList => {
            res.json(projectList)
        })
        .catch(next);
})

router.post('/', (req, res, next) => {
    Projects.postProject(req.body)
        .then(insertedProject => {
            res.status(201).json(insertedProject)
        })
        .catch(next);
})

module.exports = router;