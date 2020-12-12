var mysql = require('mysql');
var util = require('util');


var pool = mysql.createPool({
  connectionLimit: 20,
  host     : 'remotemysql.com',
  port     : '3306',
  user     : '95kfprL3Es',
  password : 'HXur9e49BD',
  database : '95kfprL3Es'
});


// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
      }
      console.log(err);
    }
    
    if (connection) connection.release()

    return
})

pool.query = util.promisify(pool.query);  

module.exports = pool;