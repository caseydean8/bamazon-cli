const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'fatbeats',
    database: 'bamazon'
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnect();
});

function afterConnect() {
    connection.query("select * from products", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    })
}