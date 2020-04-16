const mysql = require('mysql');

const connection = mysql.createConnection({
  host:'127.0.0.1',
  port:'3306',
  user:'root',
  password:'Acamica.2020',
  database: 'peliculas'
});

module.exports = connection;

