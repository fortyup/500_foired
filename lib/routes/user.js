'use strict';

const Joi = require('joi');

module.exports = [{
    method: 'post',
    path: '/user',
    options: {
        auth: false,
        tags: ['api'],
        description: 'Create a user',
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                mail: Joi.string().required().min(3).example('johndoe@gmail.com').description('Email of the user'),
                password: Joi.string().required().min(8).example('password').description('Password of the user'),
                username: Joi.string().required().min(3).example('johndoe').description('Username of the user'),
                role: Joi.array().items(Joi.string()).example(['user']).description('Scope of the user').default(['user'])
            })
        }
    },
    handler: (request, h) => {

        const { userService } = request.services();

        return userService.create(request.payload);
    }
},
{
    method: 'delete',
    path: '/user/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        description: 'Delete a user',
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required()
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();
        return await userService.delete(request.params.id);
    }
},
{
    method: 'patch',
    path: '/user/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        description: 'Edit a user',
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required()
            }),
            payload: Joi.object({
                firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
                mail: Joi.string().min(3).example('johndoe@gmail.com').description('Email of the user'),
                password: Joi.string().min(8).example('password').description('Password of the user'),
                username: Joi.string().min(3).example('johndoe').description('Username of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();
        return await userService.update(request.params.id, request.payload);
    }
}, {
    method: 'post',
    path: '/user/login',
    options: {
        auth: false,
        tags: ['api'],
        description: 'Login a user',
        validate: {
            payload: Joi.object({
                mail: Joi.string().required().min(3).example('johndoe@gmail.com').description('Email of the user'),
                password: Joi.string().required().min(8).example('password').description('Password of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        const user = await userService.verifyPassword(request.payload.mail, request.payload.password);

        const token = await userService.generateToken(user);

        return { token };

    }
}
];
