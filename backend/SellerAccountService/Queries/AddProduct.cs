using SellerAccountService.Models;
using SharedClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SellerAccountService.Queries
{
    public class AddProduct : PgWriteQuery
    {
        private Product Product { get; }
        private DBTables DbTables { get; }
        public AddProduct(PgConnection pg, string eMesssage, Product product, DBTables dbTables) : base(pg, eMesssage)
        {
            Product = product;
            DbTables = dbTables;
            this.ResultJson = (string)ExecuteQuery();

        }
        public override string BuildSqlString()
        {
            var sqlString = $"INSERT INTO {DbTables.Products}" +
                            $" VALUES(" +
                            $"'{Product.ProductID}'," +
                            $"'{Product.UploadDate}'," +
                            $"'{Product.Category}'," +
                            $"'{Product.Title}'," +
                            $"'{Product.Brand}'," +
                            $"'{Product.Manufacturer}'," +
                            $"'{Product.Price}'," +
                            $"'{Product.Size}'," +
                            $"'{Product.Style}'," +
                            $"'{Product.Address}'," +
                            $"'{Product.City}'," +
                            $"'{Product.State}'," +
                            $"'{Product.ZipCode}'," +
                            $"'{Product.Quantity}'," +
                            $"'{Product.Unit}'," +
                            $"'{Product.Condition}'," +
                            $"'{Product.Fulfillment}'," +
                            $"'{Product.Description}'," +
                            $"'{Product.State}');";

            return sqlString;
        }
    }
}
