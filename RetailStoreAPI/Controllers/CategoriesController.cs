using Microsoft.AspNetCore.Mvc;
using System;
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
                Int32 id = reader.GetInt32("id");
                String categoryName = reader.GetString("categoryName");
                Boolean isEnabled = reader.GetBoolean("isEnabled");
                String categoryDescription = reader.GetString("categoryDescription");

                category.SetId(id);
                category.SetCategoryName(categoryName);
                category.SetIsEnabled(isEnabled);
                category.SetCategoryDescription(categoryDescription);

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

            // Checks if the category is added
            if (i == 1)
                Console.WriteLine("success");
            else
                Console.WriteLine("failed");
            con.Close();

            return "Category added";
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

            // Checks if the category is edited
            if (i == 1)
                Console.WriteLine("success");
            else
                Console.WriteLine("failed");
            con.Close();

            return "Category edited";
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

            // Checks if the category is deleted
            if (i != -1)
            {
                cmd = new SqlCommand("Delete from categories where id = " + category.id, con);
                
                int j = cmd.ExecuteNonQuery();

                if(j!=-1)
                   Console.WriteLine("success");
            }
            else
                Console.WriteLine("failed");
            con.Close();

            return "Category deleted";
        }
    }
}
