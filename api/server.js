import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes';

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

app.listen(port, () => console.log('Server started on port %d', port));
