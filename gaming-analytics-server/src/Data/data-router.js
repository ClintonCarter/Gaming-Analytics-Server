//finish stringing up api
//average time and number of viewers
//connected to front end
require('dotenv').config();
const express = require('express');
const route = express.Router();
const fetch = require('node-fetch');
fetch.Promise = global.Promise;

const url = "https://api.twitch.tv/helix/analytics/games";
const key = process.env.CLIENT_ID;
const secret = process.env.CLIENT_SECRET;
const token = process.env.ACCESS_TOKEN;
console.log(key, secret)
const options = {
  method: 'GET',
  headers: {
    'Client-ID': key,
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Authorization': 'Bearer' + token,
  },
  'Authentication': { 'scope': ['analytics:read:games'] }
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
