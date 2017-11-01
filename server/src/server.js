'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false } ));
app.use(bodyParser.json());
app.use(cors());


const api = require('./api');
app.use('/api', api);

let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Started...`);
});
