using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManagement.API
{
    public class user
    {
        public string id { get; set; }

        public string userName { get; set; }

        public int role { get; set; }

        public void SetId(string id){
            this.id = id;
        }

        public void SetUserName(string userName){
            this.userName = userName;
        }

        public void SetRole(int role){
            this.role = role;
        }
    }
}
