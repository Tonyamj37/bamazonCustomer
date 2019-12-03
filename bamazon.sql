

-- Create a database called 'Bamazon' and switch into it for this activity --
CREATE DATABASE Bamazon;
USE Bamazon;

-- Create a table called 'products' which will contain the store inventory --
CREATE TABLE products(  
	item_id INTEGER(30) AUTO_INCREMENT, 
    product_name VARCHAR(30) NOT NULL,  
    department_name VARCHAR(20) NOT NULL,  
    price DECIMAL(10,2) NOT NULL,  
    stock_quantity INTEGER(11) NOT NULL,  
PRIMARY KEY (item_id)) 
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  
		('Charmin Toiler Paper', 'Grocery', 12.99, 575),
		('Pampers Baby Wipes', 'Children', 1.50, 423),
		('Yoga Mat', 'Sports', 12.75, 150),
		('10lb Dumb bell', 'Sports', 7.99, 89),
		('Tie Dye Shirt', 'Clothing', 5.55, 120),
		('Adidas Shorts', 'Clothing', 17.88, 250),
		('Pedigree Dog Food', 'Pet', 12.50, 163),
		('Advil', 'Pharmacy', 4.95, 389),
		('Band Aid', 'Pharmacy', 3.25, 550),
		('Ben & Jerry Ice Cream', 'Grocery', 3.25, 432);
        