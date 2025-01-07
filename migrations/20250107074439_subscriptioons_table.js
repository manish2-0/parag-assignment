/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {

    return knex.schema.createTable('subs', (table) => {
        table.increments('subscription_id').primary();
        table.integer('customer_id').notNullable();
        table.integer('product_id').notNullable();
        table.string('product_name').notNullable();
        table.enu('frequency', ['daily', 'weekly']).defaultTo('daily');
        table.integer('quantity').notNullable();
        table.integer('price_per_unit').notNullable();
        table.date('start_date').notNullable();
        table.date('end_date').notNullable();
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

};
