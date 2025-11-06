// // config/db.js
// const mysql = require('mysql2');
// require('dotenv').config();

// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DB
// });

// connection.connect(err => {
//   if (err) console.error('MySQL connection error:', err);
//   else console.log('MySQL Connected!');
// });

// module.exports = connection;
//raiwway
// config/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('MySQL Connection Error:', err);
    process.exit(1);
  }
  console.log('MySQL Connected to Railway!');
});

module.exports = db;