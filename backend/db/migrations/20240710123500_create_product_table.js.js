exports.up = function(knex) {
    return knex.schema.createTable('product', function(table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.decimal('price', 10, 2).notNullable();
        table.text('description');
        table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE');
        table.string('image');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('product');
};
