const mysql = require('mysql')

const inquirer = require('inquirer')

const {table} = require('table')

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
    let data,
    output;

    inquirer
        .prompt([{
            name: 'superMenu',
            type: 'list',
            message: "Supervisor Menu",
            choices: ["View Product Sales by Department", "Create New Department"]
        }])
        .then(({superMenu}) => {
            connection.query(`SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));`, function(err,res) {
                if (err) throw err
            })
            if (superMenu === "View Product Sales by Department") {
            connection.query(`select departments.department_id, departments.department_name, departments.overhead_costs, products.product_sales
            from departments
            join products on departments.department_name = products.department_name
            group by departments.department_id
            `, function(err, res) {
                if (err) throw err
                let tableHeader = [["Department ID", "Department Name", "Overhead Costs", "Product Sales"]]
                console.log(table(tableHeader))

                for (let i = 0; i < res.length; i++){
                data = [[res[i].department_id, res[i].department_name, res[i].overhead_costs, res[i].product_sales]]
                  
                output = table(data)
                console.log(output)
                }
                
            })
            } else {
                console.log("Create new apartment")
            }
            connection.end()
        })
}