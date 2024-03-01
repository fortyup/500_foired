'use strict';

module.exports = {
    async up(knex) {
        await knex.schema.createTable('favorites', (table) => {
            table.increments('id').primary();
            table.integer('movieId').unsigned().references('id').inTable('movies').notNull();
            table.integer('userId').unsigned().references('id').inTable('users').notNull();
            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('favorites');
    }
};
