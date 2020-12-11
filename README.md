# Julia Framework (0.0.8 - alpha)

Julia is an Express based Node.js framework inspired by Laravel for developing MVC style Web apps.
Please, remove or rewrite this readme file after cloning and building Julia-based projects. Also, modify package.json file according to the particular project's needs.

## Installation

Clone the repo from github to your working directory.

```bash
git clone https://github.com/major-phyo-san/julia-framework
```

## Usage

```bash
npm install

npm run keygen
npm run start (or) npm run start cluster (cluster mode)
npm run dev
npm run debug
```

## Components

Back end components are:
- Express Handlebars for template engine
- Morgan and Express-Logger for requests logging
- Cluster for cluster servers

Front end components are:
- Modernizr.js for browser features detection
- Normalize.css for consistent rendering of HTML elements

## Changelog

0.0.0 (04-10-2020)
- Project initialized
- Environment variables system
- Default view engine with EJS
- Directory structure in favor of MVC-pattern

0.0.1 (11-10-2020)
- View engine changed to Express-Hanblebars
- Default layout with HTML5
- public directory and static assets
- Error handling with error pages

0.0.2 (18-10-2020)
- Sidebars logic added to templating system
- Express server can now be run in cluster
- Environment specific behaviors introduced
- Proper HTTP requests logging with morgan (dev) and express-logger (prod)

0.0.3 (27-10-2020)
- Entry file app.js renamed to server.js
- Environment variable discovery file config.js renamed to server-env.js
- Cookie secrecy key in env files
- Error handlers seperated as middlewares

0.0.4 (03-11-2020)
- Multer file upload module built in config
- Random string generator added in config
- Added CSRF protection with CSURF

0.0.5 (20-11-2020)
- Mongoose for MongoDB database connection module built in config
- App refactored for Express-WS websocket support
- CSRF protection error fixed
- Dependencies loading re-structured
- Random generators in utilities directory
- Single routing files (web.js and api.js) for Web and API routes

0.0.6 (30-11-2020)
- Serve static assets in 'public' directory with '/public' in url (Julia way)
- Added meta tag for CSRF in main layout
- 500 error handler to general error handler

0.0.7 (02-12-2020)
- Database config re-structured
- File storage config re-structured
- Added method overriding with Method-Override
- Deleted '/tests' dir for routes

0.0.8 (09-12-2020)
- Refactored Env file
- Refactored stringGenerators module for modular support
- Added generateRandomString() in stringGenerators module
- Added generateUUID() in stringGenerators module
- Added keygen to automatically generate NODE_KEY in .ENV file
- Fixed server.js for NODE_KEY env variable
- Added 'npm run keygen' script in package.json
- Fixed file storage randomFileName generation for new string generator module
- Added cryptography module to provide shortened cryptographic functionalities
- Added base64digest(), bcrypt() and debcrypt() in cryptography module
- Refactored random numberGenerators module for modular support

## License

[APACHE LICENSE, VERSION 2.0](https://www.apache.org/licenses/LICENSE-2.0#apache-license-version-20)
The project contains works from other open source projects that have their own license terms. Please see the respective license term for each component.
