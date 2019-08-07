-- create database Bamazon;
-- use bamazon

create table products (
	item_id int not null,
    product_name varchar(100),
    department_name varchar(100),
    price float,
    stock_quantity int not null,
    primary key (item_id)
)