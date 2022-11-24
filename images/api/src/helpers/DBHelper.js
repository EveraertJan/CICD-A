
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : '',
    database : 'postgres'
  }
});

/**
 * 
 * Initialise the necessary tables of the API, if they do not exist
 * 
*/

function initialiseTables() {
  knex.schema.hasTable('sensors').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('sensors', function(t) {
        t.increments('id').primary();
        t.string('name', 100);
        t.json('location');
        t.timestamps(true, true);
      });
    }
  });

  knex.schema.hasTable('measurements').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('measurements', function(t) {
        t.increments('id').primary();
        t.float("value");
        t.integer('sensor_id').references("id").inTable("sensors").onDelete("CASCADE").onUpdate("CASCADE");
        t.timestamps(true, true);
      });
    }
  });
}


module.exports = knex;