'use strict';

module.exports = [
    {
        method: 'get',
        path: '/users',
        options: {
            auth: {
                scope: ['user', 'admin']
            },
            tags: ['api']
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            const users = await userService.getAll();
            return users;
        } },
    {
        method: 'POST',
        path: '/users/{id}/favorites',
        options: {
            auth: {
                scope: ['user']
            },
            handler: (request, h) => {
                const { userService } = request.services();
                return userService.addFavorite(request.params.id, request.payload.movieId);
            }
        }
    },
    {
        method: 'DELETE',
        path: '/users/{id}/favorites/{movieId}',
        options: {
            auth: {
                scope: ['user']
            },
            handler: (request, h) => {
                const { userService } = request.services();
                return userService.removeFavorite(request.params.id, request.params.movieId);
            }
        }
    }
];
