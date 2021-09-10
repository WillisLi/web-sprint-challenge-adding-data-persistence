const db = require('../../data/dbConfig')

const getProjects = async () => {
    const rows = await db('projects')

    const result = rows.map(row => ({
        project_id: row.project_id,
        project_name: row.project_name,
        project_description: row.project_description,
        project_completed: row.project_completed ? true : false, 
    })) 

    return result
}

const postProject = (project) => {
    return db('projects').insert(project)
        .then(([project_id]) => {
            return db('projects').where('project_id', project_id).first()
        })
        .then(newPost => {
            return {...newPost, project_completed: newPost.project_completed ? true : false}
        })
}

module.exports = {
    getProjects,
    postProject
};
