'use strict';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const Encrypt = require('../lib/modules/iut-encrypt');

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('users').del();
    await knex('users').insert([
        {
            firstname: 'John',
            lastname: 'Doe',
            username: 'john_doe',
            mail: 'test@gmail.com',
            password: Encrypt.sha1('password'),
            role: JSON.stringify(['user'])
        },
        {
            firstname: 'Jane',
            lastname: 'Doe',
            username: 'jane_doe',
            mail: 'admin@gmail.com',
            password: Encrypt.sha1('adminadmin'),
            role: JSON.stringify(['admin', 'user'])
        }
    ]);
};
