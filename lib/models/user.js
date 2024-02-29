'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get jsonAttributes() {

        return ['role'];
    }


    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            mail: Joi.string().min(3).example('johndoe@gmail.com').description('Mail of the user'),
            password: Joi.string().min(3).example('123456').description('Password of the user'),
            username: Joi.string().min(3).example('johndoe').description('Username of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            role: Joi.array().items(Joi.string()).example(['user']).description('Scope of the user').default(['user']),
            favoriteMovies: Joi.array().items(Joi.number().integer().greater(0))
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};
