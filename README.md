# Cesium Project

## Setup

### PostgreSQL

This project requires a PostgreSQL database. If you do not have PostgreSQL installed, you can run start one via [Docker](https://hub.docker.com/_/postgres):

```
docker run --rm -p 5432:5432 -e POSTGRES_PASSWORD=pg_password -d postgres
```

### Important third party libraries

- [restify](http://restify.com/) - is used for the REST API server

## Code

- `server.js` - contains the start of a restify-based API server running on 8080.

## Scripts

| Task                  | Description                                                                 |
| --------------------- | --------------------------------------------------------------------------- |
| `start`               | Runs the server on port 8080                                                |
| `db-migrate`          | Applies all pending migrations to the database                              |
| `db-seed`             | Seeds the database with test data                                           |

## Instructions to run locally
If you are using the above Docker command, no further action is needed on your part. If you are using your own database 
instances, modify DATABASE_URL in .env to point to it before proceeding.

```
npm install
```
```
npm run db-migrate
npm run db-seed
```
You can use `prisma studio` to open a gui to manage the database.
```angular2html
npm start
```
The server should now be running at `localhost:8080`