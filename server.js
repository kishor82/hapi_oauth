const hapi = require('hapi');
const HapiOAuth2Server = require('hapi-oauth2-server-plugin');
const createAuthIndex = require('./config/createAuthIndex');
const createUser = require('./config/createUser');
const authenticateUser = require('./utils/authenticate');
const model = require('./model/model');
const server = hapi.server({
  port: 3000,
  host: 'localhost'
});

async function register(server, options) {

  await server.register({
    plugin: require('hapi-auth-cookie')
  })

  // configure the "session" strategy
  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: 'sid-example',
      password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
      isSecure: false
    },
    validateFunc: async (request, session) => {
      const res = `Bearer ${session.accessToken}` === request.headers.authorization;
      if (!res) {

        return { valid: false };
      }

      return { valid: true };
    }
  });

  server.auth.default('session');

  server.route({
    method: 'GET',
    path: '/',
    handler: async (req, h) => {
      const { oauth } = req.server.plugins['hapi-oauth2-server-plugin']
      try {
        const res = await oauth.authorize(req);
        console.log('heree....')
        console.log(req.auth.credentials);
        return '<h1>Hi Kishor</h1>'
      } catch (err) {
        console.log({ err })
      }


    }
  })

  server.route({
    method: 'POST',
    path: '/register',
    handler: async (req, h) => {
      try {
        const res = await createUser(req);
        return res;
      } catch (err) {
        console.log(err)
      }
    }
  })
  server.route({
    method: 'GET',
    path: '/logout',
    options: {
      auth: false,
    },
    handler: async (req, h) => {
      req.cookieAuth.clear();
      return 'OK'
    }
  })

  server.route({
    method: 'POST',
    path: '/login',
    options: {
      auth: {
        mode: 'try'
      }
    },
    handler: async (req, h) => {
      const { oauth } = req.server.plugins['hapi-oauth2-server-plugin'];
      try {
        const res = await authenticateUser(req);
        if (res) {
          const token = await oauth.token(req)
          req.cookieAuth.set({ ...token });
          return token;
        } else {
          return {
            message: 'unauthorized'
          }
        }
      } catch (e) {
        console.log(e)
        return h.response().code(401)
      }
    }
  })

}


server.register({
  plugin: HapiOAuth2Server,
  options: {
    model
  }
});

// route

const init = async () => {

  await register(server);
  await createAuthIndex();
  await server.start();
  console.log(`Server is running at ${server.info.uri}`);
  process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
  })
}
init();