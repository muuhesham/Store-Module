const mysql = require("mysql");


const con = mysql.createConnection({
    host: "localhost",
    database: "store_module",
    user: "root",
    password: "" 
});
con.connect((err) => {
    if (err) {
        console.error('MySQL Connection Error:', err);
    }
    console.log("Connected to DB!");
});

module.exports = con;