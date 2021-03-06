DROP DATABASE IF EXISTS bamazon;

create database bamazon;
use bamazon

create table products (
	item_id int auto_increment not null,
    product_name varchar(100),
    department_name varchar(100),
    price float,
    stock_quantity int not null,
    primary key (item_id)
)


-- table added for supervisor view
CREATE TABLE departments (
department_id int auto_increment not null,
department_name varchar(100),
overhead_costs decimal (8, 2) not null,
primary key (department_id)
)


-- add column to products, 2 decimal points, must be not null or it can't be updated by addition, subtraction, etc.
alter table products add product_sales decimal(8,2) not null;


-- remove columns from table
alter table departments drop COLUMN overhead_costs;


--  add similar column to departments
alter table departments add overhead_costs decimal(8,2) not null;

-- join product sales column from products table using department_id, group by department_id 
select departments.department_id, departments.department_name, departments.overhead_costs, products.product_sales
from departments
join products on departments.department_name = products.department_name
group by departments.department_id

-- below fixed error 1055
SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))