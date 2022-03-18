using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Configuration;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System.Data;
using Newtonsoft.Json;
using System.Data.SqlTypes;
using DbDataReaderExtension;

namespace ProductManagement.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    { 
        /**
         * Helps to list all the products
        */
        [HttpGet("getProducts")]
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
                Int32 id = reader.GetInt32("id");
                String productName = reader.GetString("productName");
                String productDescription = reader.GetString("productDescription");
                Int32 category = reader.GetInt32("category");
                Boolean isEnabled = reader.GetBoolean("isEnabled");
                Double grossPrice = reader.GetDouble("grossPrice");
                Double discount = reader.GetDouble("discount");
                Int32 availableQuantity = reader.GetInt32("availableQuantity");

                product.SetId(id);
                product.SetProductName(productName);
                product.SetProductDescription(productDescription);
                product.SetCategory(category);
                product.SetIsEnabled(isEnabled);
                product.SetGrossPrice(grossPrice);
                product.SetDiscount(discount);
                product.SetAvailbleQuantity(availableQuantity);

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

            // Checks if the product is added
            if (i == 1)
                Console.WriteLine("success");
            else
                Console.WriteLine("failed");
            con.Close();

            return "Product added successfully";
        }

        /**
        * Helps to delete a product in the category
        */
        [HttpDelete("deleteProduct")]
        public string deleteProduct(Products product)
        {
            // Helps to establish a connection the database
            SqlConnection con = new SqlConnection("Data Source=(localdb)\\local;Initial Catalog=ProductManagement;");

            SqlCommand cmd = new SqlCommand("Delete from products where id = " + product.id, con);

            con.Open();
            int i = cmd.ExecuteNonQuery();

            // Checks if the product is deleted
            if (i != -1)
               Console.WriteLine("success");
            else
                Console.WriteLine("failed");
            con.Close();

            return "Product deleted successfully";
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

            // Checks if the category is edited
            if (i == 1)
                Console.WriteLine("success");
            else
                Console.WriteLine("failed");
            con.Close();

            return "Product edited";
        }
    }
}
