'use strict';

var mysql = require('promise-mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'phood'
});

module.exports = connection;