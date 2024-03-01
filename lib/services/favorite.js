'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const user = require('../models/user');
const movie = require('../models/movie');

module.exports = class FavoriteService extends Service {
    addMovieToFavorite(movieId, userId) {
        const { Favorite } = this.server.models();

        return Favorite.query().findOne({ movieId, userId })
            .then((favorite) => {
                if (favorite) {
                    throw Boom.conflict('Movie already in favorite');
                }

                return Favorite.query().insert({ movieId, userId });
            });
    }

    removeMovieFromFavorite(movieId, userId) {
        const { Favorite } = this.server.models();

        return Favorite.query().delete().where({ movieId, userId });
    }

    showFavoriteMovies(userId) {
        const { Favorite, Movie } = this.server.models();

        return Favorite.query()
            .select('movieId')
            .where({ userId })
            .then((favoriteMovies) => {
                const movieIds = favoriteMovies.map((favoriteMovie) => favoriteMovie.movieId);

                return Movie.query()
                    .whereIn('id', movieIds)
                    .select('id', 'title', 'description', 'releaseDate', 'director');
            }).catch((err) => {
                throw Boom.boomify(err);
            });
    }
};
