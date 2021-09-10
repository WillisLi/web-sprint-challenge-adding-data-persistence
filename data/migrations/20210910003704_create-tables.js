exports.up = async function(knex) {
    await knex.schema
        .createTable('projects', table => {
            table.increments('project_id')
            table.string('project_name', 128).notNullable()
            table.string('project_description', 500)
            table.boolean('project_completed').defaultTo(false)
        })
        .createTable('resources', table => {
            table.increments('resource_id')
            table.string('resource_name', 128).unique().notNullable()
            table.string('resource_description', 500)
        })
        .createTable('tasks', table => {
            table.increments('task_id')
            table.string('task_description', 500).notNullable()
            table.string('task_notes', 128)
            table.boolean('task_completed').notNullable()

            table.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
        })
        .createTable('project_resources', table => {
            table.integer('proj_res_id')
            
            table.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
            
            table.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('resource_id')
                .inTable('resources')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
        })
        // .defaultTo() doc in case of need in future
};

exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists('project_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
};
