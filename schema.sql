DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR (100) NOT NULL,
  department_name VARCHAR (100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT(11) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
  ('Outdoor Basketball', 'Basketball', 25, 20),
  ('Basketball Shoes', 'Footwear', 115, 20),
  ('Irons Set', 'Golf', 650, 15),
  ('Putter', 'Golf', 125, 15),
  ('Leather Football', 'Football', 55, 25),
  ('Football Cleats', 'Football', 105, 10),
  ('Baseball Pants', 'Baseball', 40, 35),
  ('Baseball Glove', 'Baseball', 145, 30),
  ('Baseball Bat', 'Baseball', 175, 15),
  ('Baseball Helmet', 'Baseball', 65, 30);