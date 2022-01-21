/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = async function(knex) { //make the migration function async for knex
    await knex.schema
      .createTable('projects', table => {
          table.increments('project_id').notNullable().unique()
          table.text('project_name', 128).notNullable()
          table.text('project_description', 128)
          table.boolean('project_completed').defaultTo(false)
      }) 
      .createTable('resources', table => {
          table.increments('resource_id').notNullable().unique()
          table.text('resource_name', 128).notNullable().unique()
          table.text('resource_description', 128)
        })

      .createTable('tasks', table => {
          table.increments('task_id').notNullable().unique() 
          table.text('task_description', 128).notNullable()
          table.text('task_notes')
          table.boolean('task_completed').defaultTo(false)

          table.integer('project_id')
            // forces integer to be positive
            .unsigned()
            .notNullable()
            .references('project_id')
            // this table must exist already
            .inTable('projects')
            .onDelete('CASCADE') 
            .onUpdate('CASCADE') 
      })
      .createTable('project_resources', table => {
          table.increments('project_resource_id').notNullable().unique()
          table.integer('project_id')
           // forces integer to be positive
            .unsigned()
            .notNullable()
            .references('project_id')
            // this table must exist already
            .inTable('projects')
            .onDelete('CASCADE') 
            .onUpdate('CASCADE') 

          table.integer('resource_id')
            // forces integer to be positive
            .unsigned()
            .notNullable()
            .references('resource_id')
            // this table must exist already
            .inTable('resources')
            .onDelete('CASCADE') //RESTRICT vs CASCADE
            .onUpdate('CASCADE') 
      })
      // order of creation is to avoid foreign keys or entanglements
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function(knex) {
    await knex.schema
      .dropTableIfExists('project_resources') 
      .dropTableIfExists('tasks')  //drip in reverse order of creation
      .dropTableIfExists('resources') 
      .dropTableIfExists('projects') 
  };
  