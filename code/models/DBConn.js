var mysql = require ('mysql')
var util = require ('util')

var pool = mysql.createPool({
    connectionLimit = 10,
    host     : '127.0.0.1',
    user     : process.env.DBUSER,
    password : process.env.DBPASS,
    database : 'local server'
});