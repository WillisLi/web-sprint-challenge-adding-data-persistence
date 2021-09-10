const db = require('../../data/dbConfig')

const getTasks = () => {
    return db('tasks')
        .leftJoin('projects', 'tasks.project_id', 'projects.project_id')
        .select('task_id', 'task_description', 'task_notes', 'task_completed', 'project_name', 'project_description')
}

const postTasks = (task) => {
    return db('tasks').insert(task)
        .then(([task_id]) => {
            return db('tasks').where('task_id', task_id).first()
        })
} 

module.exports = {
    getTasks,
    postTasks,
}