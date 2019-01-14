import Token from '../utils/Token';

class Middlewares {
  constructor() {
    this.token = new Token();
  }

  async verifyAuth(req, res, next) {
    const token = (req.headers.authorization.split(' '))[1];
    if(!token) {
      return res.status(403).send({ message: 'No token provided' });
    }

    try {
      const verifyToken = await this.token.verifyToken(token);
      return next(null, { decodedToken: verifyToken});
    } catch (error) {
      const message = error || 'There was an error completing your request';
      return res.status(403).send({ message });
    }
  }
}

export default Middlewares;
