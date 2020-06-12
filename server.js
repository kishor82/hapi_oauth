const hapi = require('hapi');
const HapiOAuth2Server = require('hapi-oauth2-server-plugin');
const createAuthIndex = require('./utils/createAuthIndex');
const model = require('./model/model');
const wrapError = require('./config/wrapError');
const initAuthencticateApi = require('./api/authenticate/index');
const registerStrategy = require('./config/register');
const server = hapi.server({
  port: 3000,
  host: 'localhost'
});
server.register({
  plugin: HapiOAuth2Server,
  options: {
    model
  }
});

const init = async () => {
  await registerStrategy(server);
  await createAuthIndex();
  initAuthencticateApi(server);
  await server.start();
  process.on('unhandledRejection', (e) => {
    // eslint-disable-next-line no-console
    console.log(wrapError(e));
    process.exit(1);
  });
};
init();