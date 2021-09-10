const db = require('../../data/dbConfig')

const getProjects = () => {
    return db('projects')
}

const postProject = (project) => {
    return db('projects').insert(project)
        .then(([project_id]) => {
            return db('projects').where('project_id', project_id).first()
    })
}

module.exports = {
    getProjects,
    postProject
};
