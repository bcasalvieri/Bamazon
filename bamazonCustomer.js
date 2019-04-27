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
    products.forEach(product => console.log(`${product.product_name} || ID: ${product.item_id} || Price: $${product.price}`));
    console.log(`\n`);

    // Create inquirer prompt
      // Ask user which product they would like to buy
      // Ask user how many units they would like to buy
      // Confirm order
    inquirer
      .prompt([
        {
          type: "input",
          message: "Which product would you like to buy? Please enter ID number",
          name: "choice",
          validate: function(value) {
            if (!isNaN(value)) {
              return true;
            };
            return false;
          }
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
        // If user doesn't confirm, start over
        if (!res.confirm) {
          start();
        };

        // Use array .find() method to find product user wants to purchase
        const chosenProduct = products.find(product => product.item_id === parseInt(res.choice))

        // if amount desired < store_quantity, run an UPDATE query to update the stock_quantity value for that product
        if (chosenProduct.stock_quantity >= parseInt(res.amount)) {
          const queryString = "UPDATE products SET ? WHERE?";
          connection.query(queryString,
            [
              {
                stock_quantity: (chosenProduct.stock_quantity - parseInt(res.amount))
              },
              {
                product_name: chosenProduct.product_name
              }
            ],
            function(err) {
              if (err) throw err;
              const total = chosenProduct.price * res.amount;
              console.log(`Your total is: $${total}`)
              start();
            }
          );
        }

        else {
          console.log(`Insufficient Quantity!`);
          start();
        };
      });
  });
};
      