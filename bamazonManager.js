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
    inquirer
        .prompt([{
            name: 'managerMenu',
            type: 'list',
            message: "What managerial things do you want to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }])
        .then(function({
            managerMenu
        }) {

            switch (true) {
                case (managerMenu === "View Products for Sale"):
                    console.log("view products")
                    break

                case (managerMenu === "View Low Inventory"):
                    console.log("View low inventory")
                    break

                case (managerMenu === "Add to Inventory"):
                    console.log("Add to Inventory")
                    break

                default:
                    console.log("Add new Product")

            }
            connection.end();
        })
}