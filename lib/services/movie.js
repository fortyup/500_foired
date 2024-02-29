'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class MovieService extends Service {

    create(movie) {
        const { Movie } = this.server.models();

        return Movie.query().insertAndFetch(movie);
    }

    show() {
        const { Movie } = this.server.models();

        return Movie.query().select(
            'id', 'title', 'description', 'releaseDate', 'director'
        );
    }

    async delete(id) {

        const { Movie } = this.server.models();

        try {
            return await Movie.query().deleteById(id);
        } catch (err) {
            console.warn('An error as occurred' + err);

            return Boom.badRequest('An error as occurred' + err);
        }
    }

    async edit(id, movie) {
        const { Movie } = this.server.models();

        try {
            return await Movie.query().patchAndFetchById(id, movie);
        } catch (err) {
            console.warn('An error as occurred' + err);

            return Boom.badRequest('An error as occurred' + err);
        }
    }
};
