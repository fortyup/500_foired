'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const MailService = require('./mail');
const UserService = require('./user');

module.exports = class MovieService extends Service {

    async create(movie) {
        const { Movie } = this.server.models();

        const createdMovie = await Movie.query().insertAndFetch(movie);

        const userService = this.server.services().userService;
        const allUsers = await userService.getAll();
        const mailService = new MailService();
        for (const user of allUsers) {
            await mailService.sendMail(user.mail, 'New movie added', `A new movie has been added: "${createdMovie.title}"`);
        }

        return createdMovie;
    }

    async edit(id, movie) {
        const { Movie } = this.server.models();
        const updatedMovie = await Movie.query().patchAndFetchById(id, movie);

        const favoriteService = this.server.services().favoriteService;
        const usersWithFavorite = await favoriteService.getUsersWithMovieInFavorites(id);

        const mailService = new MailService();
        for (const user of usersWithFavorite) {
            await mailService.sendMail(user.mail, 'Favorite movie updated', `The movie "${updatedMovie.title}" has been updated`);
        }

        return updatedMovie;
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
};
