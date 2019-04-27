// Import mysql & inquirer packages
const mysql = require("mysql");
const inquirer = require("inquirer");

// Connect to bamazonDB database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
})

// Create start function to start app
function start() {
  // Console.log all of the items available for sale
    // Include ids, names, and prices
  const queryString = "SELECT item_id, product_name, price FROM products"
  const query = 


}
  // Create inquirer prompt
    // Ask user for the id of the product they would like to buy
    // Ask user how many units they would like to buy
    // Confirm order
  // Select stock_quantity from database to ensure enough in stock to complete purchase
    // If not
      // Console.log "Insufficient Quantity"
      // Run start() function
    // If so
      // Update store_quantity for the item
      // Console.log total cost of purchase
      