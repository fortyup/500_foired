'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/movies/export',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            description: 'Export CSV of all movies',
        },
        handler: async (request, h) => {
            const { movieService } = request.services();

            // Générer le CSV des films
            const csvData = await movieService.generateCsv();

            // Envoyer les données CSV à la file d'attente RabbitMQ
            const messageBrokerService = request.server.services().messageBrokerService;
            await messageBrokerService.sendCsvToQueue(csvData);

            return h.response().code(204); // Pas de contenu dans la réponse HTTP
        }
    },
    {
        method: 'POST',
        path: '/movies',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            description: 'Create a movie',
            validate: {
                payload: Joi.object({
                    title: Joi.string().required().min(3).example('The Godfather').description('Title of the movie'),
                    description: Joi.string().required().min(3).example('The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.').description('Description of the movie'),
                    releaseDate: Joi.date().required().example('1972-03-24').description('Release date of the movie'),
                    director: Joi.string().required().min(3).example('Francis Ford Coppola').description('Director of the movie')
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
            description: 'Edit a movie',
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                }),
                payload: Joi.object({
                    title: Joi.string().required().min(3).example('The Godfather').description('Title of the movie'),
                    description: Joi.string().required().min(3).example('The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.').description('Description of the movie'),
                    releaseDate: Joi.date().required().example('1972-03-24').description('Release date of the movie'),
                    director: Joi.string().required().min(3).example('Francis Ford Coppola').description('Director of the movie')
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
            description: 'Delete a movie',
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
            tags: ['api'],
            description: 'Show all movies',
        },
        handler: (request, h) => {

            const { movieService } = request.services();
            return movieService.show();
        }
    }
];
