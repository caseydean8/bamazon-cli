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
overhead_costs float,
primary key (department_id)
)


-- add column to products
alter table products add product_sales decimal(5,2) not null;