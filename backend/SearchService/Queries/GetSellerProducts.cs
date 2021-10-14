using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using SharedClasses;
namespace SearchService.Queries
{
    public class GetSellerProducts : PgReadQuery
    {
        private string SellerID { get;}
        private string ProductTable { get;}
        public GetSellerProducts(PgConnection pg, string sellerid, string productTable) : base(pg, $"Retrieving all products for seller {sellerid} failed:(")
        {
            SellerID = sellerid;
            ProductTable = productTable;
            ResultJson = (string)ExecuteQuery();
        }
        public override string BuildSqlString()
        {
            var sqlString = "SELECT p.productid, p.title, p.brand, p.manufacturer, p.size, p.style, p.condition, " +
                                   "p.buyerpickup, p.price, p.quantity" +
                            $" FROM {ProductTable} p" +
                            $" WHERE sellerid = {SellerID}";

            return sqlString;
        }

        public override object ExtractData(ref NpgsqlDataReader reader)
        {
            var returnData = new Dictionary<string, Dictionary<string, Dictionary<string,string>>>();
            returnData.Add("data", new Dictionary<string, Dictionary<string, string>>());

            while (reader.Read())
            {
                var dct = new Dictionary<string, string>();
                dct.Add("productID", reader.GetValue(0).ToString());
                dct.Add("title", reader.GetValue(1).ToString());
                dct.Add("brand", reader.GetValue(2).ToString());
                dct.Add("manufacturer", reader.GetValue(3).ToString());
                dct.Add("size", reader.GetValue(4).ToString());
                dct.Add("style", reader.GetValue(5).ToString());
                dct.Add("condition", reader.GetValue(6).ToString());
                dct.Add("buyerpickup", reader.GetValue(7).ToString());
                dct.Add("price", reader.GetValue(8).ToString());
                dct.Add("quantity", reader.GetValue(9).ToString());

                returnData["data"].Add(reader.GetValue(0).ToString(), dct);

            }

            return ToJson(returnData);
        }
    }
}
