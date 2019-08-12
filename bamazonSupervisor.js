const mysql = require('mysql')

const inquirer = require('requirer')

const table = require('table')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'fatbeats',
    database: 'bamazon'
})

connection.connect(function(err) {
    if (err) throw err;
    supervisorMenu()
})

const supervisorMenu = () => {
    inquirer
        .prompt([{
            name: 'superMenu',
            type: 'list',
            message: "Supervisor Menu",
            choices: ["View Product Sales by Department", "Create New Department"]
        }])
        .then
}