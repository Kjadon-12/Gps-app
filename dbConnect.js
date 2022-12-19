const mysql = require('mysql2');


const dbConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pensdb1',
    port: 3306
})


dbConnect.connect((err)=>{
    if(err) throw err;
    else console.log("db connection ")
})

module.exports = dbConnect;
