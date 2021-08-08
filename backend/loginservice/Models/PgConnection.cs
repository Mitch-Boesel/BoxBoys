using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace loginservice.Models
{
    public class PgConnection
    {
        public string host { get; set; }
        public string username { get; set; }
        public string database { get; set; }
        public string password { get; set; }
        public string port { get; set; }

        public string ConnectionString()
        {
            return $"Host={this.host};Username={this.username};Database={this.database};password={this.password};port={this.port}";
        }
    }
}
