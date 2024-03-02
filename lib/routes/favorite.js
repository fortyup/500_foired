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
        path: '/favorite/add',
        options: {
            tags: ['api'],
            description: 'Add a movie to favorites',
            validate: {
                payload: Joi.object({
                    movieId: Joi.number().integer().greater(0).required().description('The movie id to add to favorites')
                })
            },
            handler: async (request, h) => {
                const { favoriteService } = request.services();
                const currentUser = request.auth.credentials;
                const { movieId } = request.payload;

                await favoriteService.addMovieToFavorite(movieId, currentUser.id);
                return h.response().code(201);
            }
        }
    },
    {
        method: 'DELETE',
        path: '/favorite/remove',
        options: {
            tags: ['api'],
            description: 'Remove a movie from favorites',
            validate: {
                payload: Joi.object({
                    movieId: Joi.number().integer().greater(0).required().description('The movie id to remove from favorites')
                })
            },
            handler: async (request, h) => {
                const { favoriteService } = request.services();
                const currentUser = request.auth.credentials;
                const { movieId } = request.payload;

                await favoriteService.removeMovieFromFavorite(movieId, currentUser.id);
                return h.response().code(204);
            }
        }
    }
];
