const router = require('express').Router();
const Tasks = require('./model')

router.get('/', (req, res, next) => {
    Tasks.getTasks()
        .then(tasksList => {
            res.json(tasksList)
        })
        .catch(next);
})

router.post('/', (req, res, next) => {
    Tasks.postTasks(req.body)
        .then(insertedTask => {
            res.status(201).json(insertedTask)
        })
        .catch(next);
})

module.exports = router;