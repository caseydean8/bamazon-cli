const mysql = require('mysql')

const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'fatbeats',
    database: 'bamazon'
})

connection.connect(function(err) {
    if (err) throw err;
    afterConnect();
})

function afterConnect() {
    inquirer.prompt([{
        name: 'manager-menu',
        type:'list',
        message: "What managerial things do you want to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }])
}