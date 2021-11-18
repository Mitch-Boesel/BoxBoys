using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using SharedClasses;

namespace SellerAccountService.Queries
{
    public class GetProducts : PgReadQuery
    {
        private string SellerID { get; }
        private string ProductTable { get; }
        public GetProducts(PgConnection pg, string sellerid, string productTable) : base(pg, $"Retrieving all products for seller {sellerid} failed:(")
        {
            SellerID = sellerid;
            ProductTable = productTable;
            ResultJson = (string)ExecuteQuery();
        }
        public override string BuildSqlString()
        {
            var sqlString = "SELECT p.productid, p.title, p.brand, p.manufacturer, p.size, p.style, p.condition, " +
                                   "p.buyerpickup, p.price, p.quantity, p.city, p.state, p.category, p.address, " +
                                   "p.zipcode, p.description" +
                            $" FROM {ProductTable} p" +
                            $" WHERE sellerid = {SellerID}";

            return sqlString;
        }

        public override object ExtractData(ref NpgsqlDataReader reader)
        {
            var returnData = new Dictionary<string, Dictionary<string, Dictionary<string, string>>>();
            returnData.Add("data", new Dictionary<string, Dictionary<string, string>>());

            while (reader.Read())
            {
                var dct = new Dictionary<string, string>();
                dct.Add("productid", reader.GetValue(0).ToString());
                dct.Add("title", reader.GetValue(1).ToString());
                dct.Add("brand", reader.GetValue(2).ToString());
                dct.Add("manufacturer", reader.GetValue(3).ToString());
                dct.Add("size", reader.GetValue(4).ToString());
                dct.Add("style", reader.GetValue(5).ToString());
                dct.Add("condition", reader.GetValue(6).ToString());
                dct.Add("buyerpickup", reader.GetValue(7).ToString());
                dct.Add("price", reader.GetValue(8).ToString());
                dct.Add("quantity", reader.GetValue(9).ToString());
                dct.Add("location", $"{reader.GetValue(10)}, {reader.GetValue(11)}");
                dct.Add("city", $"{reader.GetValue(10).ToString()}");
                dct.Add("state", $"{reader.GetValue(11).ToString()}");
                dct.Add("category", $"{reader.GetValue(12).ToString()}");
                dct.Add("address", $"{reader.GetValue(13).ToString()}");
                dct.Add("zipcode", $"{reader.GetValue(14).ToString()}");
                dct.Add("description", $"{reader.GetValue(15).ToString()}");


                returnData["data"].Add(reader.GetValue(0).ToString(), dct);

            }

            return ToJson(returnData);
        }
    }
}
