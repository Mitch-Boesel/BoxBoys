using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using SharedClasses;

namespace SearchService.Queries
{
    public class GetProducts : PgReadQuery
    {
        private string ProductTable { get; }
        public string Category { get; }


        public GetProducts(PgConnection pg, string pTable, string category): base(pg, $"Error getting {pTable} products:(")
        {
            ProductTable = pTable;
            Category = category;
            ResultJson = (string)ExecuteQuery();
        }

        public override string BuildSqlString()
        {
            var sqlString = "SELECT p.productid, p.title, p.brand, p.manufacturer, p.size, p.style, p.condition, " +
                                   "p.buyerpickup, p.price, p.quantity, p.city, p.state" +
                            $" FROM {ProductTable} p" +
                            $" WHERE p.category = '{Category}'";
            return sqlString;
        }

        //public override object ExtractData(ref NpgsqlDataReader reader)
        //{
        //    var returnData = new Dictionary<string, object>();
        //    returnData.Add("data", new Dictionary<string, Dictionary<string, string>>());
        //    var count = 0;
        //
        //    while (reader.Read())
        //    {
        //        var dct = new Dictionary<string, string>();
        //        dct.Add("productID", reader.GetValue(0).ToString());
        //        dct.Add("title", reader.GetValue(1).ToString());
        //        dct.Add("brand", reader.GetValue(2).ToString());
        //        dct.Add("manufacturer", reader.GetValue(3).ToString());
        //        dct.Add("size", reader.GetValue(4).ToString());
        //        dct.Add("style", reader.GetValue(5).ToString());
        //        dct.Add("condition", reader.GetValue(6).ToString());
        //        dct.Add("buyerpickup", reader.GetValue(7).ToString());
        //        dct.Add("price", reader.GetValue(8).ToString());
        //        dct.Add("quantity", reader.GetValue(9).ToString());
        //        dct.Add("location", $"{reader.GetValue(10)}, {reader.GetValue(11)}");
        //
        //        returnData["data"].Add(reader.GetValue(0).ToString(), dct);
        //
        //        count += 1;
        //
        //    }
        //
        //    returnData.Add("metrics", new Dictionary<string, string>());
        //    returnData["metrics"].Add("products returned", count.ToString());
        //
        //    return ToJson(returnData);
        //}

        public override object ExtractData(ref NpgsqlDataReader reader)
        {
            var returnData = new Dictionary<string, Dictionary<string, Dictionary<string, string>>>();
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
                dct.Add("location", $"{reader.GetValue(10)}, {reader.GetValue(11)}");

                returnData["data"].Add(reader.GetValue(0).ToString(), dct);

            }

            return ToJson(returnData);
        }
    }
}
