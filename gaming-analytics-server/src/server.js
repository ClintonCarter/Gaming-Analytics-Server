const express = require('express');
const app = require('../src/app');
const route = require('../src/Data/data-router');
const { PORT } = require('./config')
const fetch = require('node-fetch');
const knex = require('knex');
const apiKey = 'CE6952659902BFF7DE3C71F8203059A1';
const DB = 'postgres://fztxooam:QqYFC14XdIvOvdp8rkpPhX4bz4E2yglm@raja.db.elephantsql.com:5432/fztxooam';
const getIDs = `https://api.steampowered.com/ISteamApps/GetAppList/v1/?key=${apiKey}`;
const paramsLimit = 31906;
const limit = paramsLimit / 2;

app.use(express.static('public'));
app.use('/', route);

fetch(getIDs)
  .then(res => res.json())
  .then(res => {

    const chunk1 = [], chunk2 = [], chunk3 = [], chunk4 = [], chunk5 = [], chunk6 = [];

    res.applist.apps.app.forEach((val, index) => {
      if (index >= 0 && index < limit) {
        chunk1.push(val)
      } else if (index >= limit && index < (limit * 2)) {
        chunk2.push(val)
      } else if (index >= (limit * 2) && index < (limit * 3)) {
        chunk3.push(val)
      } else if (index >= (limit * 3) && index < (limit * 4)) {
        chunk4.push(val)
      } else if (index >= (limit * 4) && index < (limit * 5)) {
        chunk5.push(val)
      } else if (index >= (limit * 5) && index < (limit * 6)) {
        chunk6.push(val)
      }
    });

    const chunks = [chunk1, chunk2, chunk3, chunk4, chunk5, chunk6];

    db.transaction(trx =>
      Promise.all([
        chunks.forEach(chunk =>
          db('gamesids')
            .transacting(trx)
            .insert(chunk)
            .catch(err => {
              console.log('Went Wrong', err)
            })
        )
      ])
    )

  })
  .catch(err => {
    console.log('Error', err)
  })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})