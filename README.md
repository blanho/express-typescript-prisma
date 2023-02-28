```
Hey There! 🙌 
🤾 that ⭐️ button if you like this boilerplate. 
```

<img alt="express-typescript" src="https://geekyants.github.io/express-typescript/public/images/express-typescript.png" height="50%" width="60%">

A boilerplate for [Node.js](https://nodejs.org/en) App.

* This boilerplate is built using [Express.js](https://expressjs.com/) web framework, and is using [Typescript Lang](https://www.typescriptlang.org/) for writing the app's logic. 
* It uses Node's [Cluster API](https://nodejs.org/api/cluster.html), this helps us to take advantage of multi-core systems & to handle the load.
* For storing custom constant configurations within the `process.env` - [DotEnv](https://github.com/motdotla/dotenv) package is used.
* For Database - Repo contains the use of [Prisma](https://www.prisma.io/) (ie. [Postgresql](https://www.postgresql.org/) object modeling for [Node.js](https://nodejs.org/en/)).
* For Routing - Repo contains the use of [express-router](https://expressjs.com/en/guide/routing.html) & have distributed Routes into two files ie. Web Routes & API Routes. 
* For Route Auth Middleware - Web routes are configured with [CSRF Token](https://github.com/krakenjs/lusca) while the API routes are configured with [JSON Web Token](https://github.com/auth0/express-jwt).
* For Strategies Auth - Repo contains the use of the accessToken and refreshToken and also AuthO Google API for sending mail.
* For designing and describing Restful APIs - Repo contains the use of [Swagger](https://swagger.io/) to automatically build beautiful and interactive API documentation
* For views - Repo contains the use of [Reactjs](https://reactjs.org/) to render data to UI and also [Redux Toolkit](https://redux-toolkit.js.org/) to have the state management and [Redux Query](https://redux-toolkit.js.org/) to manage API.
* For validation - Repo contains the use of [Zod](https://github.com/colinhacks/zod) and [React-Hook-Form](https://react-hook-form.com/) to validate input
* For dockerizing this application - Repo contains the use of [Docker](https://www.docker.com/)

# Contents
* [Global Requisites](#global-requisites)
* [App Structure](#app-structure)
* [Install, Configure & Run](#install-configure--run)

# App Structure

```bash
├── dist
├── client
├── env
├── prisma
├── server
├── schemas
├── .dockerignore
├── .env.example
├── .eslintrc.json
├── .docker-compose.yaml
├── Dockerfile
├── jest.config.js
├── package.json
├── tsconfig.json
├── yarn.lock

``` 
# Install, Configure & Run

Below mentioned are the steps to install, configure & run in your platform/distributions.

```bash
# Clone the repo.
git clone https://github.com/blanho/express-typescript-prisma;

```bash
# Without Docker
# Install NPM dependencies.
# Note: You can review the list of dependencies from the below link.
# https://github.com/blanho/pern-typescript-shopapp.git
yarn install;

# Add your .env file using any editor of your choice and take all data from .env.example to .env and configure it on your own.
# Please Note: You should add all the configurations details


# Migrate and Push entity to your database
# Note: It is assumed here that you have PostgresQL running in the background and that you have created the database.

yarn db:migrate & yarn db:push

# Seed data

yarn prisma seed

# Run the app
yarn run dev;
```

```bash
# With Docker

# Note: It is assumed here that you have Docker running in the background.

# Run the app in docker as a foreground process
docker-compose up

# Run the app in docker as a background process
docker-compose up -d
```
# Licenses
```bash
Inspired by:
 - Dung Le
 - John Smilga
 - Ho Bao Lan
```
