# CineFlixAPI 🎬

## 📚 Table of Contents

- [Description](#description)
- [Technologies](#technologies)
- [How to run](#how-to-run)
- [Usage](#usage)
   - [Users](#users)
   - [User](#user)
   - [Movies](#movies)
   - [Favorite](#favorite)
- [Author](#author)

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
3. Run `docker run --name hapi-mysql -e MYSQL_USER=root -e MYSQL_PASSWORD=hapi -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -d -p 3308:3306 mysql:8 mysqld --default-authentication-plugin=mysql_native_password`
4. Run `docker run -it --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.13-management` to start a RabbitMQ container.
5. Install the dependencies: `npm install`
6. Run the migrations: `npx knex migrate:latest`,
7. Run the seeds `knex seed:run`
7. Start the server: `npm start`

## 🛠️ Usage

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
