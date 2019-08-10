# bamazon-cli

Bamazon is a command line program utilizing node.js and MySql server, and is dependent on node packages inquirer and msql.

When opened, the user is given a list of items with prices.
The user is then prompted to select an item by its id# and select a quantity of the item for purchase. 
If there is enough of the item in stock, the user id given a total cost for the order, 
and the database is updated to reflect a change in stock.
Otherwise the user is made aware of how much stock is available. 
