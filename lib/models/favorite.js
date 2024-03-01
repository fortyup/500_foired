'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Favorite extends Model {
    static get tableName() {
        return 'favorites';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            movieId: Joi.number().integer().greater(0).required().description('The movie id'),
            userId: Joi.number().integer().greater(0).required().description('The user id'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
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
