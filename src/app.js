// src/app.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const clientesRouter = require('./routes/clientes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/clientes', clientesRouter);

module.exports = app;