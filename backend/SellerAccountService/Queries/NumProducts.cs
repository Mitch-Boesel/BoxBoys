using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using SharedClasses;

namespace SellerAccountService.Queries
{
    public class NumProducts : PgReadQuery
    {
        private int SellerID { get;}
        private DBTables Tables { get; }
        public NumProducts(PgConnection pg, string eMessage, int sellerID, DBTables dBTables):base(pg,eMessage)
        {
            SellerID = sellerID;
            Tables = dBTables;
            this.ResultJson = (string)ExecuteQuery();

        }
        public override string BuildSqlString()
        {
            var sqlString = "SELECT COUNT(*)" +
                            $" FROM {Tables.Products}" +
                            $" WHERE sellerid='{SellerID}'";
            return sqlString;
        }

        public override object ExtractData(ref NpgsqlDataReader reader)
        {
            bool flag = false;
            var numProducts = 0;
            while (reader.Read())
            {
                if (flag)
                    throw new Exception("More than one sql row returned for NumProductsForSeller");
                numProducts = reader.GetInt32(0);
                flag = true;
            }
            return numProducts.ToString();
        }
    }
}
