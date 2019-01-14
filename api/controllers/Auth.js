import Token from '../utils/Token';

class Auth {
  constructor(username = 'admin', password = 'admin') {
    this.token = new Token();
    this.username = username;
    this.password = password;
  }
  
  async login(req, res) {
    const { username } = req.body;

    try {
      const token = await this.token.signToken({ username });
      return res.send({ message: 'Success', token });
    } catch (error) {
      const message = error || 'There was an error completing your request';
      return res.status(500).send({ message });
    }
  }
}

export default Auth;
