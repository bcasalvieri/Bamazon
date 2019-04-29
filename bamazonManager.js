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

function addInventory() {
  const queryString = "SELECT * FROM products";
  connection.query(queryString, function(err, products) {
    if (err) throw err;

    const allProducts = products.map(product => product.product_name);

    inquirer
      .prompt([
        {
          type: "list",
          message: "Which product do you want to update inventory?",
          choices: allProducts,
          name: "choice"
        },
        {
          type: "input",
          message: "How many units of product are you adding?",
          name: "quantity",
          validate: function(value) {
            if (!isNaN(value)) {
              return true;
            };
            return false;
          } 
        }
      ]).then(function(res) {
        // use array.find() method to find product you want to update inventory
        const chosenProduct = products.find(product => product.product_name === res.choice);
        
        // UPDATE stock_quantity for chosen product
        const queryString = "UPDATE products SET? WHERE ?";
        connection.query(queryString,
          [
            {
              stock_quantity: (chosenProduct.stock_quantity + parseInt(res.quantity))
            },
            {
              product_name: chosenProduct.product_name
            }
          ],
          function(err) {
            if (err) throw err;
            console.log(`\nAdd Inventory Complete!.\n`)
            start();
          }
        );
      });
  });
};