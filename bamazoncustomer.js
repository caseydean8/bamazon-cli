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
let total = 0;

const afterConnect = () => {
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
                    message: "How many would you like?"
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
                        total = (quantityDesired * res[prodId].price).toFixed(2);
                        console.log(`${quantityDesired} X ${res[prodId].product_name} will cost $${total}`);
                        puchaseConfirmation();
                    } else {
                        console.log(`Sorry, we only have ${stockQuantity} in stock`);
                        connection.end();
                    }
                } else {
                    console.log("Please choose a valid ID#");
                    connection.end();
                }
            })
    })
}

const puchaseConfirmation = () => {
    inquirer
        .prompt([{
            name: 'confirmPurchase',
            type: 'list',
            message: 'Select "Complete Sale" to finish purchase',
            choices: ["Complete Sale", "Return to Shopping"]
        }])
        .then((answer) => {
            answer.confirmPurchase === "Complete Sale" ? updateQuantity() : afterConnect()
        })
    }

const updateQuantity = () => {
    connection.query(`update products set stock_quantity = stock_quantity - ${quantityDesired} where item_id = ${updateId}`, function(err, res) {
        if (err) throw err;
    })
    connection.query(`update products set product_sales = product_sales + ${total} where item_id = ${updateId}`, function(err, res) {
        if (err) throw err
        console.log("Your order is complete! Thank you!")
    })
    connection.end();
}
