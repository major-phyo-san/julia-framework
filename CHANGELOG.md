## Current Version

- Version code - 0.1.0
- Release date - 2020.12.20
- Note - First major release

## Changelog

0.0.0 (2020-10-04)
- Project initialized
- Environment variables system
- Default view engine with EJS
- Directory structure in favor of MVC-pattern

0.0.1 (2020-10-11)
- View engine changed to Express-Hanblebars
- Default layout with HTML5
- public directory and static assets
- Error handling with error pages

0.0.2 (2020-10-18)
- Sidebars logic added to templating system
- Express server can now be run in cluster
- Environment specific behaviors introduced
- Proper HTTP requests logging with morgan (dev) and express-logger (prod)

0.0.3 (2020-10-27)
- Entry file app.js renamed to server.js
- Environment variable discovery file config.js renamed to server-env.js
- Cookie secrecy key in env files
- Error handlers seperated as middlewares

0.0.4 (2020-11-03)
- Multer file upload module built in config
- Random string generator added in config
- Added CSRF protection with CSURF

0.0.5 (2020-11-20)
- Mongoose for MongoDB database connection module built in config
- App refactored for Express-WS websocket support
- CSRF protection error fixed
- Dependencies loading re-structured
- Random generators in utilities directory
- Single routing files (web.js and api.js) for Web and API routes

0.0.6 (2020-11-30)
- Serve static assets in 'public' directory with '/public' in url (Julia way)
- Added meta tag for CSRF in main layout
- 500 error handler to general error handler

0.0.7 (2020-12-02)
- Database config re-structured
- File storage config re-structured
- Added method overriding with Method-Override
- Deleted '/tests' dir for routes

0.0.8 (2020-12-09)
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

0.0.9 (2020-12-16)
- Added session module
- Added auth module
- Added web authentication in auth module using Passport
- Refactored default error view
- Refactored default error handler middlewares
- Added default User model and schema
- Added default auth views (Login and Register views)
- Added default auth controllers for web (Login and Register controllers)
- Added '/sessions' dir for storing file-based session files
- Added nodemon config file
- Deleted default user controller
- Fixed default web routes

0.1.0 (2020-12-25)
- Refactored server.js
- Refactored www
- Refactored config files
- Fixed async connect() of makeMongoDBConnection() of database module
- Added api authentication in auth module using JWT
- Added auth vaidator middleware for API and Web
- Added auth test routes for API and Web
- Fixed API routes from checking CSRF token