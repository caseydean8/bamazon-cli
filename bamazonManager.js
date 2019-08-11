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

const afterConnect = () => {
    inquirer
        .prompt([{
            name: 'managerMenu',
            type: 'list',
            message: "What managerial things do you want to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }])
        .then(({
            managerMenu
        }) => {

            switch (true) {
                case (managerMenu === "View Products for Sale"):
                    console.log("PRODUCT DETAILS")
                    viewProds()
                    break

                case (managerMenu === "View Low Inventory"):
                    console.log("LOW INVENTORY")
                    viewLowInv()
                    break

                case (managerMenu === "Add to Inventory"):
                    console.log("Add to Inventory")
                    addInv()
                    break

                default:
                    console.log("Add new Product")
                    // addNewProd()

            }
            // connection.end();
        })
}

const viewProds = () => {
    connection.query("select * from products", function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(`-------------------------`)
            console.log(`item id# ${res[i].item_id}`)
            console.log(res[i].product_name)
            console.log(res[i].department_name)
            console.log(res[i].price)
            console.log(`${res[i].stock_quantity} remaining`)
            console.log(`-------------------------`)
        }
    })
}

const viewLowInv = () => {
    connection.query("select * from products where stock_quantity < 5", function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(`-------------------------`)
            console.log(res[i].product_name)
            console.log(`${res[i].stock_quantity} remaining`)
            console.log(`-------------------------`)
        }
        // afterConnect()
    })
}

const addInv = () => {
    inquirer
        .prompt ([{
            name: 'add',
            type: 'input',
            message: "Choose an item ID# to add stock"
        }, 
        {
            name: 'quantity',
            type: 'input',
            message: "Enter amount to add to stock"
        }
        ])
        .then((answer) => {
            connection.query(`update products set stock_quantity = stock_quantity + ${answer.quantity} where item_id = ${answer.add}`, function(err, res) {
                if (err) throw err
            })
            connection.query(`select * from products where item_id = ${answer.add}`, function(err, res) {
                if (err) throw err
                console.log(`There are now ${res[0].stock_quantity} in stock`)
            })
        })
}

