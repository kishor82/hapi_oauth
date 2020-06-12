const moment = require('moment');
const JWT = require('jsonwebtoken');
const authenticateUser = require('../config/authenticate');
const JWT_ACCESS_TOKEN_SECRET = 'secr3t3';

const client = {
  clientId: 'client_id',
  clientSecret: 'client_secret',
  redirectUris: ['/ok'],
  grants: [
    "password",
    "authorization_code",
    "refresh_token"
  ]
};

module.exports = {
  generateAccessToken: async (client, user, scope) => {
    let token;
    let expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);
    const payload = {
      ...client,
      ...user,
      ...scope,
      exp: expiry.getTime(),
    };
    token = JWT.sign(payload, JWT_ACCESS_TOKEN_SECRET, { algorithm: 'HS256' });
    return token;
  },
  getAccessToken: async (bearerToken) => {
    try {
      const decoded = JWT.verify(bearerToken, JWT_ACCESS_TOKEN_SECRET);
      return {
        accessToken: bearerToken,
        accessTokenExpiresAt: new Date(decoded.exp),
        ...decoded,
      };

    } catch (e) {
      return false;
    }
  },
  getAuthorizationCode: async (code) => {
    return {
      code: 'be6e365e9f29c19e631078e8e376326bdf086576',
      expiresAt: moment().add(1, 'hour').toDate(),
      codde2: code
    };
  },
  getClient: async (clientId, clientSecret) => {
    if (client.clientId == clientId && client.clientSecret == clientSecret) {
      return {
        id: clientId,
        clientSecret,
        redirectUris: ['/ok'],
        grants: [
          "password",
          "authorization_code",
          "refresh_token"
        ]
      };
    }
  },
  saveAuthorizationCode: async (code, client, user) => {
    return {
      ...code,
      client,
      user: { id: user.userId }
    };
  },
  saveToken: async (token, client, user) => {
    return {
      ...token,
      client,
      ...user
    };
  },
  getUser: async (username, password) => {
    try {
      await authenticateUser(username, password);
      return {
        user: {
          username,
          password
        }
      };
    } catch (e) {
      return false;
    }
  },
  revokeAuthorizationCode: async (code) => {
    return code;
  }
};