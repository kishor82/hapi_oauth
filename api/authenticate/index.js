const auth = require('./auth_controller');
const initAuthencticateApi = (server) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: async () => {
      return '<h1>hi there</h1>';
    }
  });

  server.route({
    method: 'POST',
    path: '/register',
    options: {
      auth: false
    },
    handler: auth.register
  });
  server.route({
    method: 'GET',
    path: '/logout',
    options: {
      auth: false,
    },
    handler: auth.logout
  });

  server.route({
    method: 'POST',
    path: '/login',
    options: {
      auth: false
    },
    handler: auth.login
  });
};

module.exports = initAuthencticateApi;