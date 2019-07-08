const express = require('express');
const app = require('../src/app');
const route = require('../src/Data/data-router');
const { PORT } = require('./config')

app.use(express.static('public'));
app.use('/', route);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})