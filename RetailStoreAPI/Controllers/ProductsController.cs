using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;


namespace ProductManagement.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    { 
        /**
         * Helps to list all the products
        */
        [HttpGet("All")]
        public List<Products> getProducts()
        {
            // Helps to establish a connection the database
            SqlConnection con = new SqlConnection("Data Source=(localdb)\\local;Initial Catalog=ProductManagement;");

            // Query for getting all the products from the database
            SqlCommand cmd = new SqlCommand("Select * from Products;", con);

            // To open a connection
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            List<Products> products = new List<Products>();
            Products product;
            while (reader.Read())
            {
                product = new Products();
                product.id = reader.GetInt32("id");
                product.productName = reader.GetString("productName");
                product.productDescription = reader.GetString("productDescription");
                product.category = reader.GetInt32("category");
                product.isEnabled = reader.GetBoolean("isEnabled");
                product.grossPrice = reader.GetDouble("grossPrice");
                product.discount = reader.GetDouble("discount");
                product.availbleQuantity = reader.GetInt32("availableQuantity");

                products.Add(product);
            }
            reader.Close();
            con.Close();
            return products;
        }

        /**
        * Helps to add a new product in the category
        */
        [HttpPost("addProduct")]
        public string addProduct(Products product)
        {
            // Helps to establish a connection the database
            SqlConnection con = new SqlConnection("Data Source=(localdb)\\local;Initial Catalog=ProductManagement;");

            // Query for adding the product in the database
            SqlCommand cmd = new SqlCommand("INSERT INTO Products (productName,productDescription,category,isEnabled,grossPrice,discount,availableQuantity)VALUES('" + product.productName + "','" + product.productDescription + "','"+ product.category+ "','"+ product.isEnabled + "','" + product.grossPrice + "','" + product.discount + "','" + product.availbleQuantity +"');", con);
            con.Open();
            int i = cmd.ExecuteNonQuery();

            string message = (i == 1) ? "Product added succesfully." : "Failed to add a product.";
            con.Close();

            return message;
        }

        /**
        * Helps to delete a product in the category
        */
        [HttpDelete("{id}")]
        public string deleteProduct(int id)
        {
            // Helps to establish a connection the database
            SqlConnection con = new SqlConnection("Data Source=(localdb)\\local;Initial Catalog=ProductManagement;");

            SqlCommand cmd = new SqlCommand("Delete from products where id = " + id, con);

            con.Open();
            int i = cmd.ExecuteNonQuery();

            string message = (i != -1) ? "Product deleted succesfully." : "Failed to delete a product.";
            con.Close();

            return message;
        }

        /**
        * Helps to edit a product in the store
        */
        [HttpPut("editProduct")]
        public string editCategory(Products product)
        {
            // Helps to establish a connection the database
            SqlConnection con = new SqlConnection("Data Source=(localdb)\\local;Initial Catalog=ProductManagement;;");

            SqlCommand cmd = new SqlCommand("UPDATE products SET productName ='" + product.productName + "', isEnabled = '" + product.isEnabled + "', productDescription = '" + product.productDescription + "', category = '" + product.category + "', grossPrice = '" + product.grossPrice + "', discount = '" + product.discount + "', availableQuantity = '" + product.availbleQuantity + "' WHERE id=" + product.id, con);

            con.Open();
            int i = cmd.ExecuteNonQuery();
            string message = (i == 1) ? "Product edited succesfully." : "Failed to edit a product.";
            con.Close();

            return message;
        }
    }
}
