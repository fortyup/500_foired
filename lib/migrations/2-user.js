'use strict';

module.exports = {
    async up(knex) {
        await knex.schema.alterTable('users', (table) => {
            table.json('role').notNull().defaultTo({ 'type': 'user' });
        });
    },

    async down(knex) {
        await knex.schema.alterTable('users', (table) => {
            table.dropColumn('role');
        });
    }
};
