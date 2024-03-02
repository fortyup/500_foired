'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FavoriteService extends Service {
    async addMovieToFavorite(movieId, userId) {
        const { Favorite } = this.server.models();

        const existingFavorite = await Favorite.query().findOne({ movieId, userId });

        if (existingFavorite) {
            throw Boom.conflict('Movie already in favorites');
        }

        await Favorite.query().insert({ movieId, userId });
    }

    async removeMovieFromFavorite(movieId, userId) {
        const { Favorite } = this.server.models();

        await Favorite.query().delete().where({ movieId, userId });
    }

    async showFavoriteMovies(userId) {
        const { Favorite, Movie } = this.server.models();

        const favoriteMovies = await Favorite.query().select('movieId').where({ userId });

        const movieIds = favoriteMovies.map((favoriteMovie) => favoriteMovie.movieId);

        return Movie.query().whereIn('id', movieIds).select('id', 'title', 'description', 'releaseDate', 'director');
    }
};
