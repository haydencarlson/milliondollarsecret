
exports.up = function(knex, Promise) {
	return knex.schema.createTable('user', function (table) {
		table.increments('id');
		table.string('ip');
		table.integer('visits');
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};