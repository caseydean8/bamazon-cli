# bamazon-cli

Bamazon is a command line program utilizing node.js and MySql server, and is dependent on node packages inquirer and mysql.

When opened, the user is given a list of items with prices.

The user is then prompted to select an item by its id# and select a quantity of the item for purchase. 

If there is enough of the item in stock, the user id given a total cost for the order, 
and the database is updated to reflect a change in stock.

Otherwise the user is made aware of how much stock is available. 

Video of bamazon in use: https://drive.google.com/open?id=1gvfqL9rYmJLZP1x1MfO6YFbRzi7E2SfM

The app also contains a manager version.

The manager is given the choice of:
* Viewing all products for sale
* Viewing low inventory
* Adding inventory to existing database
* Adding new products to the database

video of bamazonManager.js in use: https://drive.google.com/open?id=12a0j4DI5WnWfS7uJ8k06VLSq7XsO_XM2
