import joi from 'joi';

const sendJoiError = (error, res) => {
  const meta = error.details.map(errMsg => ({ message: errMsg.message, field: errMsg.path[0] }));
  return res.status(400).send({ message: 'Bad Request', meta });
}

export default {
  country: (req, res, next) => {
    const schema = {
      country: joi.string().regex(/[A-Za-z_-]+/i).required(),
    };

    const payload = req.body || req.params;

    return joi.validate(payload, schema, { abortEarly: false }, (error, value) => {
      if(error) {
        return sendJoiError(error, res);
      }
      req.body = value;
      return next();
    });
  },

  login: (req, res, next) => {
    const defaultAuth = 'admin';
    const { username, password } = req.body;
    const schema = {
      username: joi.string().required(),
      password: joi.string().required()
    };

    if(username !== defaultAuth || password !== defaultAuth) {
      return res.status(401).send({ message: 'Username or password is invalid' });
    }
    
    return joi.validate(req.body, schema, { abortEarly: false }, (error, value) => {
      if(error) {
        return sendJoiError(error, res);
      }
      req.body = value;
      return next();
    });
  }
}
