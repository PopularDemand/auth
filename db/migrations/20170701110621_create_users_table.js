
exports.up = function(knex, Promise) {
  return knex.schema.createTable('levels', (table) => {
    table.increments();
    table.string('name').notNullable().defaultTo('initiate');
    table.timestamps();
  })
  .createTable('users', (table) => {
    table.increments();
    table.string('nickname').notNullable();
    table.string('email').notNullable();
    table.string('encrypted_password').notNullable();
    table.string('salt').notNullable();
    table.string('first_name');
    table.string('last_name');
    table.integer('level_id').references('id').inTable('levels');
    table.timestamps();
  });
};

// what to run for rollbacks
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users').dropTable('levels');
};
