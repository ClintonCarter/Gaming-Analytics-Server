//finish stringing up api
//average time and number of viewers
//connected to front end
require('dotenv').config();
const express = require('express');
const route = express.Router();
const fetch = require('node-fetch');
fetch.Promise = global.Promise;

const url = "https://rapidapi.com/stefan.skliarov/api/SteamWeb";
const key = process.env.API_KEY;
const options = {
  method: 'GET'
}

route.get('/api', (req,res) => {
  fetch(url, options)
  .then(apiRes => apiRes.json())
  .then(apiRes => {
    res.json(apiRes)
  })
  .catch(err => {
    console.log('Error', err)
  })
});

module.exports = route;
