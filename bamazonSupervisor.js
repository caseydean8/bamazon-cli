const mysql = require('mysql')

const inquirer = require('inquirer')

const {
    table
} = require('table')

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
    let config, output;

    inquirer
        .prompt([{
            name: 'superMenu',
            type: 'list',
            message: "Supervisor Menu",
            choices: ["View Product Sales by Department", "Create New Department"]
        }])
        .then(({
            superMenu
        }) => {
            connection.query(`SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));`, function(err, res) {
                if (err) throw err
            })
            if (superMenu === "View Product Sales by Department") {
                connection.query(`select departments.department_id, departments.department_name, departments.overhead_costs, products.product_sales
            from departments
            join products on departments.department_name = products.department_name
            group by departments.department_id
            `, function(err, res) {
                    if (err) throw err
                    let data = [
                        ["Dept \n ID", "Department \n Name", "Overhead \n Costs", "Product \n Sales"]
                    ]
                    for (let i = 0; i < res.length; i++) {
                        data.push([res[i].department_id, res[i].department_name, res[i].overhead_costs, res[i].product_sales])
                    }

                    output = table(data)

                    console.log(output)
                })
                connection.end()
            } else {
                addNewDept()
            }
        })
}

const addNewDept = () => {
    inquirer
        .prompt([{
                name: 'department_id',
                type: 'input',
                message: "Choose an department id#"
            },
            {
                name: 'department_name',
                type: 'input',
                message: "Add department name"
            },
            {
                name: 'overhead_costs',
                type: 'input',
                message: "Add overhead costs"
            }
        ])
        .then((answer) => {
            connection.query(`insert into departments set ?`, {
                    dept_id: answer.dept_id,
                    dept_name: answer.dept_name,
                    overhead_costs: answer.overhead_costs
                },
                function(err, res) {
                    if (err) throw err
                    console.log("Department Added")
                })
            connection.end()
        })
}