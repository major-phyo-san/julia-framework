// server-env.js
// this file is responsible for easy discovery of environment variables for the server
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;
//console.log(envs);
module.exports = envs;