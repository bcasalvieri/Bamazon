// Import mysql & inquirer packages
const mysql = require("mysql");
const inquirer = require("inquirer");

// Connect to bamazonDB database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Pa$$w0rd",
  database: "bamazonDB"
});

connection.connect(function (err) {
  if (err) throw err;
  start();
})

function start() {
  // Use inquirer to list menu options
  // View roducts for sale
  // View low inventory
  // Add to inventory
  // Add new product
  inquirer
    .prompt([{
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ],
      name: "choice"
    }]).then(function (res) {
      // Create switch statement for res.choice to run corresponding functions
      switch (res.choice) {
        case "View Products for Sale":
          viewProducts();
          break;
        case "View Low Inventory":
          viewLowInventory();
          break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Product":
          addNewProduct();
          break;
      };
    });
};

function viewProducts() {
  const queryString = "SELECT * FROM products"
  connection.query(queryString, function (err, products) {
    if (err) throw err;
    console.log(`\nITEMS FOR SALE`);
    products.forEach(product => console.log(`${product.product_name} || ID: ${product.item_id} || Price: $${product.price} || Quantity: ${product.stock_quantity}`));
    console.log(`\n`);
    start();
  });
};

function viewLowInventory() {
  const queryString = "SELECT * FROM products"
  connection.query(queryString, function (err, products) {
      if (err) throw err;

      products.forEach(product => {
        if (product.stock_quantity < 5) {
          console.log(`\nLOW INVENTORY`);
          console.log(`${product.product_name} || ID: ${product.item_id} || Price: $${product.price} || Quantity: ${product.stock_quantity}`);
          console.log(`\n`);
        };
      });

    start();
  });
};