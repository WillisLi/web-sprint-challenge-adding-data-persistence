const db = require('../../data/dbConfig')

const getTasks = async () => {
    const rows = await db('tasks')
        .leftJoin('projects', 'tasks.project_id', 'projects.project_id')
        .select('task_id', 'task_description', 'task_notes', 'task_completed', 'project_name', 'project_description')

        const result = rows.map(row => ({
            task_id: row.task_id,
            task_notes: row.task_notes,
            task_description: row.task_description,
            task_completed: row.task_completed ? true : false,
            project_name: row.project_name,
            project_description: row.project_description,
        })) 
    
        return result
} 

const postTasks = (task) => {
    return db('tasks').insert(task)
        .then(([task_id]) => {
            return db('tasks').where('task_id', task_id).first()
        })
        .then(newTask => {
            return {...newTask, task_completed: newTask.task_completed ? true : false}
        })
} 

module.exports = {
    getTasks,
    postTasks,
}