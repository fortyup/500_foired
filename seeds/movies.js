'use strict';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('movies').del();
    await knex('movies').insert([
        {
            title: 'The Godfather',
            description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
            releaseDate: '1972-03-24',
            director: 'Francis Ford Coppola'
        },
        {
            title: 'The Shawshank Redemption',
            description: 'Two imprisoned',
            releaseDate: '1994-09-23',
            director: 'Frank Darabont'
        },
        {
            title: 'The Dark Knight',
            description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
            releaseDate: '2008-07-18',
            director: 'Christopher Nolan'
        },
        {
            title: 'The Lord of the Rings: The Return of the King',
            description: 'Gandalf and Aragorn lead the World',
            releaseDate: '2003-12-17',
            director: 'Peter Jackson'
        }
    ]);
};
