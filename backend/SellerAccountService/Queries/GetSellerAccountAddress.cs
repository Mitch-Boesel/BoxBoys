using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using SharedClasses;

namespace SellerAccountService.Queries
{
    public class GetSellerAccountAddress : PgReadQuery
    {
        private int SellerId { get; set; }
        private string Table { get; set; }
        public FullAddress FullAddress { get; set; }
        public GetSellerAccountAddress(PgConnection pg, DBTables dBTables, int sellerId, string eMessage="An Error Occured Retrieving ") :base(pg,eMessage)
        {
            Table = dBTables.Products;
            SellerId = sellerId;
            FullAddress = (FullAddress)ExecuteQuery();
        }
        public override string BuildSqlString()
        {
            string sqlString = $"SELECT address, city, usstate, zipcode" +
                               $" FROM {Table}" +
                               $" WHERE sellerid = '{SellerId}'";
            return sqlString;
        }

        public override object ExtractData(ref NpgsqlDataReader reader)
        {
            FullAddress fullAddress = new FullAddress();
            bool flag = false;
            while (reader.Read())
            {
                if (flag)
                    throw new Exception("GetSellerAccountAddress SQL Query returned more that one row");

                fullAddress.Address = reader.GetString(0);
                fullAddress.City = reader.GetString(1);
                fullAddress.State = reader.GetString(2);
                fullAddress.Zipcode = reader.GetInt32(3);
            }
            return fullAddress;
        }
    }
}
