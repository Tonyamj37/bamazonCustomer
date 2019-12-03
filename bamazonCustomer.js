// Pull in required dependencies
var inquirer = require('inquirer');
var mysql = require("mysql");

// MySQL connection parameters
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'rootroot',
	database: 'Bamazon'
});

// If connection doesn't work, error
connection.connect(function(err) {
	if (err) throw (err);
});

// Display product list
var displayProducts = function() {
	var query = "Select * FROM products";
		connection.query(query, function (err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++){
			console.log("Product ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price + " || Stock_quantity " + res[i].stock_quantity);
		}
		promptUserPurchase();
	});
};
	
function promptUserPurchase() {
// Create a prompt with questions
	inquirer.prompt ([
	{
		type: "input",
		message: "What is the product ID?",
		name: "item_id",
// validateInput to confirm only positive integers 
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false
		}
	},
		
	{
		type: "input",
		message: "How many do you need?",
		name: "quantity",
// validateInput to confirm only positive integers 
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false
		}
	},

]).then(function(input){
	var item_id = input.item_id;
	var quantity = input.quantity;
	
	makePurchase (item_id, quantity);
});
};
// Purchase Item function
function makePurchase(item_id, quantity) {
// Query db to confirm that the given item ID exists in the desired quantity
	var queryStr = 'SELECT * FROM products WHERE item_id = ?';


	connection.query(queryStr, [item_id], function(err, data) {
	if (err) throw err;

    if (data.length === 0) {
		console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
		displayProducts();

}   else {
	    var productData = data[0];


// If the quantity requested by the user is in stock
	if (quantity <= productData.stock_quantity) {
		console.log('Congratulations, the product you requested is in stock! Placing order!');

// Construct the updating query string
    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item_id;

// Update the inventory
connection.query(updateQueryStr, function(err, data) {
	if (err) throw err;
        console.log('Your order has been placed! Your total is $' + productData.price * quantity);
		console.log('Thank you for shopping with us!');
		console.log("\n---------------------------------------------------------------------\n");

// End the database connection
connection.end();
	})
}   else {
	    console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
		console.log('Please modify your order.');
		console.log("\n---------------------------------------------------------------------\n");

displayProducts();
		}
	}
})
}

// runBamazon will execute the main application logic
function runBamazon() {
    console.log('___ENTER runBamazon___');

// Display the available inventory
displayProducts();

};

// Run the application logic

runBamazon();