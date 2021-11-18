using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SharedClasses;
using SellerAccountService.Models;

namespace SellerAccountService.Queries
{
    public class UpdateProduct : PgWriteQuery
    {
        private string ProductTable { get;}
        private Product P { get; }

        public UpdateProduct(PgConnection pg, string prodTable, Product product) : base(pg, "Update Product Failed :(")
        {
            ProductTable = prodTable;
            P = product;
            this.ResultJson = (string)ExecuteQuery();
        }

        public override string BuildSqlString()
        {
            var sqlString = $"UPDATE {ProductTable} " +
                            $"SET" +
                            $" category='{P.Category}'," +
                            $" title='{P.Title}'," +
                            $" brand='{P.Brand}'," +
                            $" manufacturer='{P.Manufacturer}'," +
                            $" price='{P.Price}'," +
                            $" size='{P.Size}'," +
                            $" style='{P.Style}'," +
                            $" address='{P.Address}'," +
                            $" city='{P.City}'," +
                            $" state='{P.State}'," +
                            $" zipcode='{P.ZipCode}'," +
                            $" quantity='{P.Quantity}'," +
                            $" condition='{P.Condition}'," +
                            $" buyerpickup='{P.Buyerpickup}'," +
                            $" description='{P.Description}'" +
                            $" WHERE productid = {P.ProductID};";
            return sqlString;
        }
    }
}
