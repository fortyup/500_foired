# CineFlixAPI 🎬

## 📚 Table of Contents

- [Description](#-description)
- [Technologies](#-technologies)
- [How to run](#-how-to-run)
- [Usage](#%EF%B8%8F-usage)
   - [Users](#users)
   - [User](#user)
   - [Movies](#movies)
   - [Favorite](#favorite)
- [Author](#%EF%B8%8F-author)

## 📖 Description

This is a simple API that allows you to manage movies and users. It is a RESTful API that uses JWT for authentication
and authorization.

## 💻 Technologies

![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
![Hapi](https://img.shields.io/badge/-Hapi-000000?logo=hapi&logoColor=white)
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white)
![NodeMailer](https://img.shields.io/badge/-NodeMailer-339933?logo=node.js&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/-RabbitMQ-FF6600?logo=rabbitmq&logoColor=white)
![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white)

## 🚀 How to run

1. Clone the repository
2. Navigate to the project directory: `cd CineFlixAPI`
3. Run `docker-compose up -d` to start the MySQL and RabbitMQ containers
4. Install the dependencies: `npm install`
5. Run the migrations: `npx knex migrate:latest`,
6. Run the seeds `npx knex seed:run`
7. Start the server: `npm start`
8. The server will be running on http://localhost:3000/documentation
9. Connect to the server using the credentials:
    - Mail: `admin@gmail.com`
    - Password: `adminadmin`
10. Put the JWT token in the `Authorize` header to access the other routes.

## 🛠️ Usage

You can connect to MySQL using the following command: ```bash mysql -h localhost -P 3308 -u fortyup -p``` and the password is `hapi`.

The API has the following routes:

### Users

- `GET /users` - Get all users

### User

- `POST /user` - Create a new user
- `DELETE /user/{id}` - Delete a user
- `PATCH /user/{id}` - Update a user
- `POST /user/login` - Login a user

### Movies

- `GET /movies` - Show all movies
- `POST /movies` - Create a new movie
- `DELETE /movies/{id}` - Delete a movie
- `PATCH /movies/{id}` - Update a movie
- `GET /movies/export` - Export all movies to a CSV file

### Favorite

- `GET /favorite/{userId}` - Get all favorite movies of a user
- `POST /favorite/add` - Add a movie to the favorite list of a user
- `DELETE /favorite/remove` - Remove a movie from the favorite list of a user

## ✍️ Author

- [**Maxime Capel**](https://github.com/fortyup)
