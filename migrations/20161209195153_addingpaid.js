
exports.up = function(knex, Promise) {
	return knex.schema.createTable('user', function (table) {
		table.increments('id');
		table.string('ip');
		table.integer('visits');
		table.boolean('paid');
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
