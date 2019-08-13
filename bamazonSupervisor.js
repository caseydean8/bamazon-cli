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
    let config, data,
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

                data = [
                    ["Dept \n ID", "Department \n Name", "Overhead \n Costs", "Product \n Sales"],
                    
                    [res[0].department_id, res[0].department_name, res[0].overhead_costs, res[0].product_sales],

                    [res[1].department_id, res[1].department_name, res[1].overhead_costs, res[1].product_sales],

                    [res[2].department_id, res[2].department_name, res[2].overhead_costs, res[2].product_sales],
                    
                    [res[3].department_id, res[3].department_name, res[3].overhead_costs, res[3].product_sales],
                    
                    [res[4].department_id, res[4].department_name, res[4].overhead_costs, res[4].product_sales],
                    
                    [res[5].department_id, res[5].department_name, res[5].overhead_costs, res[5].product_sales],
                ]
                  
                output = table(data)
                
                console.log(output)
                })
            } else {
                console.log("Create new apartment")
            }
            connection.end()
        })
}