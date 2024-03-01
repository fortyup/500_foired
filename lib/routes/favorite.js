'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/favorite/{userId}',
        options: {
            tags: ['api'],
            description: 'Show favorite movies',
            validate: {
                params: Joi.object({
                    userId: Joi.number().integer().greater(0).required().description('The user id')
                })
            },
            handler: async (request, h) => {
                const { favoriteService } = request.services();

                return await favoriteService.showFavoriteMovies(request.params.userId);
            }
        }
    }
];
