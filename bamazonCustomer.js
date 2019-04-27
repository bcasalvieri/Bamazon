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
  connection.query(queryString, function(err, products) {
    if (err) throw err;
    console.log(`\nITEMS FOR SALE`)
    products.forEach(product => console.log(`Name: ${product.product_name} || ID: ${product.item_id} || Price: $${product.price}`));
    console.log(`\n`);
    
    // Create inquirer prompt
      // Ask user which product they would like to buy
      // Ask user how many units they would like to buy
      // Confirm order
    const allProducts = products.map(product => product.product_name);
    
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which product would you like to buy?",
          choices: allProducts,
          name: "choice"
        },
        {
          type: "input",
          message: "How many would you like to buy?",
          name: "amount",
          validate: function(value) {
            if (!isNaN(value)) {
              return true;
            }
            return false;
          }
        },
        {
          type: "confirm",
          message: "Would you like to place the order?",
          name: "confirm",
          default: true
        }
      ]).then(function(res) {
        console.log(res)
      })
  })


}
  // Select stock_quantity from database to ensure enough in stock to complete purchase
    // If not
      // Console.log "Insufficient Quantity"
      // Run start() function
    // If so
      // Update store_quantity for the item
      // Console.log total cost of purchase
      