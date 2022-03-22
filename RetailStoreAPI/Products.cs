using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManagement.API
{
    public class Products
    {
        public int id { get; set; }

        public string productName { get; set; }

        public string productDescription { get; set; }

        public int category { get; set; }

        public bool isEnabled { get; set; }

        public Double grossPrice { get; set; }
        
        public Double discount { get; set; }

        public int availableQuantity { get; set; }

        public void SetId(int id){
            this.id = id;
        }

        public void SetProductName(string productName)
        {
            this.productName = productName;
        }

        public void SetProductDescription(string productDescription)
        {
            this.productDescription = productDescription;
        }

        public void SetCategory(int category){
            this.category = category;
        }

        public void SetIsEnabled(bool isEnabled)
        {
            this.isEnabled = isEnabled;
        }

        public void SetGrossPrice(Double grossPrice){
            this.grossPrice = grossPrice;
        }

        public void SetDiscount(Double discount){
            this.discount = discount;
        }

        public void SetAvailableQuantity(int availableQuantity){
            this.availableQuantity = availableQuantity;
        }
    }
}
