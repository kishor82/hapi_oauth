const wrapError = require('../../config/wrapError');
const createUser = require('../../utils/createUser');
const auth = {};
auth.login = async (req) => {
  const { oauth } = req.server.plugins['hapi-oauth2-server-plugin'];
  try {
    const token = await oauth.token(req);
    req.cookieAuth.set({ ...token });
    return token;
  } catch (e) {
    return wrapError(e);
  }
};

auth.logout = async (req) => {
  req.cookieAuth.clear();
  return 'OK';
};

auth.register = async (req) => {
  try {
    const res = await createUser(req);
    return res;
  } catch (e) {
    return wrapError(e);
  }
};

module.exports = auth;