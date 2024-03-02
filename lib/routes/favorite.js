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
    },
    {
        method: 'POST',
        path: '/favorite/{userId}/add',
        options: {
            tags: ['api'],
            description: 'Add a movie to favorites',
            validate: {
                params: Joi.object({
                    userId: Joi.number().integer().greater(0).required().description('The user id')
                }),
                payload: Joi.object({
                    movieId: Joi.number().integer().greater(0).required().description('The movie id to add to favorites')
                })
            },
            handler: async (request, h) => {
                const { favoriteService } = request.services();
                const { userId } = request.params;
                const { movieId } = request.payload;

                await favoriteService.addMovieToFavorite(movieId, userId);
                return h.response().code(201);
            }
        }
    },
    {
        method: 'DELETE',
        path: '/favorite/{userId}/remove',
        options: {
            tags: ['api'],
            description: 'Remove a movie from favorites',
            validate: {
                params: Joi.object({
                    userId: Joi.number().integer().greater(0).required().description('The user id')
                }),
                payload: Joi.object({
                    movieId: Joi.number().integer().greater(0).required().description('The movie id to remove from favorites')
                })
            },
            handler: async (request, h) => {
                const { favoriteService } = request.services();
                const { userId } = request.params;
                const { movieId } = request.payload;

                await favoriteService.removeMovieFromFavorite(movieId, userId);
                return h.response().code(204);
            }
        }
    }
];
