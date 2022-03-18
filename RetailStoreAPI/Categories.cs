using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManagement.API
{
    public class Categories
    {
        public int id { get; set; }

        public string categoryName { get; set; }

        public bool isEnabled { get; set; }

        public string categoryDescription { get; set; }

        public void SetId(int id){
            this.id = id;
        }

        public void SetCategoryName(string categoryName)
        {
            this.categoryName = categoryName;
        }

        public void SetIsEnabled(bool isEnabled)
        {
            this.isEnabled = isEnabled;
        }

        public void SetCategoryDescription(string categoryDescription)
        {
            this.categoryDescription = categoryDescription;
        }
    }
}
