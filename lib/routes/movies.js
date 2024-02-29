'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/movies',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    releaseDate: Joi.date().required(),
                    director: Joi.string().required()
                })
            }
        },
        handler: (request, h) => {

            const { movieService } = request.services();
            return movieService.create(request.payload);
        }
    },
    {
        method: 'PATCH',
        path: '/movies/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                }),
                payload: Joi.object({
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    releaseDate: Joi.date().required(),
                    director: Joi.string().required()
                })
            }
        },
        handler: (request, h) => {

            const { movieService } = request.services();
            return movieService.edit(request.params.id, request.payload);
        }
    },

    {
        method: 'DELETE',
        path: '/movies/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                })
            }
        },
        handler: async (request, h) => {

            const { movieService } = request.services();
            return await movieService.delete(request.params.id);
        }
    },

    {
        method: 'GET',
        path: '/movies',
        options: {
            auth: {
                scope: ['user', 'admin']
            },
            tags: ['api']
        },
        handler: (request, h) => {

            const { movieService } = request.services();
            return movieService.show();
        }
    }
];
