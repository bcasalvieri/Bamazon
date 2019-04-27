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

function start() {
  // Use inquirer to list menu options
    // View roducts for sale
    // View low inventory
    // Add to inventory
    // Add new product
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ],
        name: "choice"
      }
    ]).then(function(res) {
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