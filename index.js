const mysql = require('mysql');

const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'fatbeats',
    database: 'bamazon'
});

connection.connect(function(err) {
    if (err) throw err;
    afterConnect();
});

let quantityDesired = 0;
let updateId = 0;

function afterConnect() {
    connection.query("select * from products", function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++)
            console.log(res[i].product_name + "\n" + "$" + res[i].price + "\n" + "ID# " + res[i].item_id + "\n" + "------------------------------------------------");
        inquirer
            .prompt([{
                    name: 'item_id',
                    type: 'input',
                    message: "Please select an item by id number"
                },
                {
                    name: 'quantity',
                    type: 'input',
                    message: "How many of these fantastic items would you like to buy my great friend?"
                }
            ])
            .then(function(answer) {
                if (answer.item_id <= 10 && answer.item_id > 0) {
                    let prodId = parseInt(answer.item_id) - 1;
                    // console.log(prodId);
                    updateId = parseInt(res[prodId].item_id);
                    // console.log(updateId);
                    quantityDesired = answer.quantity;
                    // console.log(quantityDesired);
                    let stockQuantity = res[prodId].stock_quantity;
                    if (quantityDesired <= stockQuantity) {
                        let total = (quantityDesired * res[prodId].price).toFixed(2);
                        console.log(`${quantityDesired} X ${res[prodId].product_name} will cost $${total}`);
                        updateQuantity();
                    } else {
                        console.log(`Sorry, we only have ${stockQuantity} in stock`);
                        connection.end();
                    }
                } else {
                    console.log("What is wrong with you? You really couldn't pick an ID number between 1 and 10? Get out of here!");
                    connection.end();
                }
            })
    })
}

function updateQuantity() {
    connection.query(`update products set stock_quantity = stock_quantity - ${quantityDesired} where item_id = ${updateId}`, function(err, res) {
        if (err) throw err;
    })
    connection.end();
}