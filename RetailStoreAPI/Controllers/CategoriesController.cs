using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;

namespace ProductManagement.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : ControllerBase
    {
        /**
         * Helps to list all the categories 
        */
        [HttpGet("All")]
        public List<Categories> getCategories()
        {
            // Helps to establish a connection the database
            SqlConnection con = new SqlConnection("Data Source=(localdb)\\local;Initial Catalog=ProductManagement;");

            // Query for getting all the categories available
            SqlCommand cmd = new SqlCommand("Select * from Categories;", con);

            // To open the connnection
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            List<Categories> categoriesList = new List<Categories>();
            Categories category;
            while (reader.Read())
            {
                category = new Categories();
                category.id = reader.GetInt32("id");
                category.categoryName = reader.GetString("categoryName");
                category.isEnabled = reader.GetBoolean("isEnabled");
                category.categoryDescription = reader.GetString("categoryDescription");
                categoriesList.Add(category);
            }
            reader.Close();
            con.Close();
            return categoriesList;
        }

        /**
        * Helps to add a new category in the store
        */
        [HttpPost("addCategories")]
        public string addCategories(Categories category)
        {
            // Helps to establish a connection the database
            SqlConnection con = new SqlConnection("Data Source=(localdb)\\local;Initial Catalog=ProductManagement;;");

            // Query for adding the category in the database
            SqlCommand cmd = new SqlCommand("INSERT INTO Categories (categoryName,isEnabled,categoryDescription)VALUES('" + category.categoryName + "','" + category.isEnabled+ "','" + category.categoryDescription+ "');", con);
            con.Open();
            int i = cmd.ExecuteNonQuery();

            string message = (i == 1) ? "Category added succesfully." : "Failed to add a new category.";
            con.Close();

            return message;
        }

        /**
        * Helps to edit a category in the store
        */
        [HttpPut("editCategory")]
        public string editCategory(Categories category)
        {
            // Helps to establish a connection the database
            SqlConnection con = new SqlConnection("Data Source=(localdb)\\local;Initial Catalog=ProductManagement;;");

            SqlCommand cmd = new SqlCommand("UPDATE Categories SET categoryName ='" + category.categoryName + "', isEnabled = '" + category.isEnabled + "', categoryDescription = '" + category.categoryDescription + "' WHERE id=" + category.id, con);
    
            con.Open();
            int i = cmd.ExecuteNonQuery();

            string message = (i == 1) ? "Category edited succesfully." : "Failed to edit category.";

            con.Close();

            return message;
        }

        /**
        * Helps to delete a category in the store
        */
        [HttpDelete("deleteCategory")]
        public string deleteCategory(Categories category)
        {
            // Helps to establish a connection the database
            SqlConnection con = new SqlConnection("Data Source=(localdb)\\local;Initial Catalog=ProductManagement;");

            SqlCommand cmd = new SqlCommand("Delete from Products where category = " + category.id, con);

            con.Open();
            int i = cmd.ExecuteNonQuery();
            if (i != -1)
            {
                cmd = new SqlCommand("Delete from categories where id = " + category.id, con);
                int j = cmd.ExecuteNonQuery();
                string message = (j != -1) ? "Category deleted succesfully." : "Failed to delete a category.";
                con.Close();
                return message;
            }
            return "Failed to delete a category.";
        }
    }
}
