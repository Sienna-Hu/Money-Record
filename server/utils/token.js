import jwt from 'jsonwebtoken';

const createToken = function(auth) {
  return jwt.sign({
          user: auth.user
      }, 'my-secret',
      {
          expiresIn: 60 * 120
      });
};

export const generateToken = function(req, res, next) {
  req.token = createToken(req.auth);
  return next();
}

export const sendToken = function(req, res) {
  res.setHeader('x-auth-token', req.token);
  return res.status(200).send(JSON.stringify(req.user));
}