# Clevernote
![This is an image](/Clevernote-screenshot.png)

## Summary
[Clevernote](https://jyang-clevernote.herokuapp.com/) is a web application inspired by Evernote built using the following technologies:
- Javascript
- Express
- React
- Redux
- CSS
- BCrypt
- Heroku
- Sequelize
- PostgreSQL

Clevernote allows users to:
- Create an account
- Log in / Log out
- Read, create, update, and delete notes
- Read, create, update, and delete notebooks
- Add/remove notes to/from notebooks

## Installation
In the root directory, run `npm install` to install dependencies for both the front and backend.

## Development
- Ensure PostgreSQL is installed and running
- Create a database user with CREATEDB privledges.
- Copy backend/.env.example to backend/.env and configure the database information with the user created in step 1.
- Set up the database:
  - Run `npm run sequelize db:create`
  - Run `npm run sequelize db:migrate`
  - Run `npm run sequelize db:seed:all`
- Start the development servers:
  - Run `npm run dev:backend`
  - Run `npm run dev:frontend`

## Deployment on Heroku
- Add environment JWT_EXPIRES_IN and JWT_SECRET environment variables
- Deploy to heroku
- Migrate & seed database
  - Run `heroku run npm run sequelize db:migrate`
  - Run `heroku run npm run sequelize db:seed:all`
  
## Wiki Links
[Features](https://github.com/josephjyang/clevernote/wiki/Features)
[React Components List](https://github.com/josephjyang/clevernote/wiki/React-Components-list)
[Database Schema](https://github.com/josephjyang/clevernote/wiki/Database-Schema)
[Frontend Routes](https://github.com/josephjyang/clevernote/wiki/Frontend-Routes)
[API Routes]
