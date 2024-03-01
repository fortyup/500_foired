'use strict';

module.exports = {
    async up(knex) {
        await knex.schema.alterTable('users', (table) => {
            table.string('password').notNull();
            table.string('mail').notNull();
            table.string('username');
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('users');
    }
};
