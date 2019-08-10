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
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnect();
});

let quantity = 0;

function afterConnect() {
    connection.query("select * from products", function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++)
        console.log(res[i].product_name + "\n" + "$" + res[i].price + "\n" + "ID# " + res[i].item_id + "\n" + "------------------------------------------------");
        inquirer
        .prompt([
            {
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
            let prodId = answer.item_id;
            console.log(res[prodId - 1].product_name);
        })
        connection.end();
        // buyItem();
    })
}

// function buyItem() {
//     inquirer
//         .prompt([
//             {
//                 name: 'item_id',
//                 type: 'input',
//                 message: "Please select an item by id number"
//             },
//             {
//                 name: 'quantity',
//                 type: 'input',
//                 message: "How many of these fantastic items would you like to buy my great friend?"
//             }
//         ])
//         .then(function(answer) {
//             // connection.query("select * from products", function(err, res) {
//                 // if (err) throw err;
//                 for (let i = 0; i < res.length; i++);
//                 if (answer.item_id === res[i].item_id)
//                 console.log(res[i].product_name);
//             })
//         // })
// }

