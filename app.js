const express = require('express');
const pg = require('pg');
const axios = require('axios');
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'hayden',
    password : 'a',
    database : 'milliondollarsecret'
  }
});
const app = express();
const PORT = 8080;
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  axios.get("http://ip-api.com/json").then(function(response) {
    var userData = response.data;
    knex.select('ip').from('user').where({ip: userData.query})
      .then((ip) => {
          console.log(ip);
        if (!ip.length) {
              knex('user').insert({ip: userData.query, paid: false})
                .then((response) => {
            });
        } 
    });
  });
  res.render('index');
});

app.get('/paid', (req, res) => {
  axios.get("http://ip-api.com/json").then(function(response) {
    var userData = response.data;
    knex('user')
    .where({ip: userData.query})
    .update({paid: true})
    .then((response) => {
      res.redirect('/');
    });
  });
});

app.get('/thesecret', (req, res) => {
  res.render('thesecret');
});

app.listen(PORT, () => {
  console.log(`App is now listening on ${PORT}`)
});