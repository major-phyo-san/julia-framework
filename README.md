# Julia Framework

Julia is an Express based Node.js framework inspired by Laravel for developing MVC style Web apps.
Please, remove or rewrite this readme file after cloning and building Julia-based projects. Also, modify package.json file according to the particular project's needs.

## Installation

Clone the repo from github to your working directory.

```bash
git clone https://github.com/major-phyo-san/julia-framework
```

Rename .env.example file to .env.
Write environment variables (server config settings) for your project in .env file.

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

## License

[APACHE LICENSE, VERSION 2.0](https://www.apache.org/licenses/LICENSE-2.0#apache-license-version-20)
The project contains works from other open source projects that have their own license terms. Please see the respective license term for each component.
