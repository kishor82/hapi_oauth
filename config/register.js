const registerStrategy = async (server) => {

  await server.register({
    plugin: require('hapi-auth-cookie')
  });

  // configure the "session" strategy
  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: 'sid-example',
      password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
      isSecure: false
    },
    validateFunc: async (request, session) => {
      const { oauth } = request.server.plugins['hapi-oauth2-server-plugin'];
      try {
        const authenticate = await oauth.authenticate(request);
        if (!authenticate) {
          return { valid: false };
        }
        return { valid: true, ...session };
      } catch (e) {
        return { valid: false };
      }
    }
  });
  server.auth.default('session');
};

module.exports = registerStrategy;