import express from 'express';
import controllers from './controllers';
import validations from './middlewares/validations';
import Middlewares from './middlewares';

const routes = express.Router();
const { countries, auth } = controllers;
const middlewares = new Middlewares();

routes.get('/', (_, res) => res.send({ message: 'Welcome to the API' }));
routes.post('/login', validations.login, (req, res) => auth.login(req, res));

routes.use((req, res, next) => middlewares.verifyAuth(req, res, next));

routes.get('/countries', (req, res) => countries.getCountries(req, res));
routes.post('/countries', validations.country, (req, res) => countries.saveCountry(req, res));
routes.delete('/countries/:country?', (req, res) => countries.deleteCountry(req, res));

export default routes;
