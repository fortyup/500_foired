'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {

    static get tableName() {
        return 'movies';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().required().example('The Matrix').description('Title of the movie'),
            description: Joi.string().example('A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.').description('Description of the movie'),
            releaseDate: Joi.date().example('1999-03-31').description('Release date of the movie'),
            director: Joi.string().example('Lana Wachowski').description('Director of the movie'),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
        });
    }

    $beforeInsert(queryContext) {
        this.createdAt = new Date();
        this.updatedAt = this.createdAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
};
