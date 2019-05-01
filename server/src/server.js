require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const api = require('./api');
app.use('/api', api);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server Started on port: ${port}`);
});
