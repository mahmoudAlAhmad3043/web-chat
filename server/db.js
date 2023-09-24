const mysql = require('mysql');

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'consumers'
});

db.getConnection((err)=>{
    let msg=''
    err?msg="connect database failed":msg="connect database successfully";
    console.log(msg);
});

module.exports = db;