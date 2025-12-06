const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: "127.0.0.1",
  password: process.env.PASSWORD,
  connectionLimit: 10,
});

// dbConnection.execute("select 'test' ", (err, result) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log("connected");
//   }
// });

module.exports = dbConnection.promise()