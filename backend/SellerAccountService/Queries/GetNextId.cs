using Npgsql;
using SharedClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SellerAccountService.Queries
{
    public class GetNextId : PgReadQuery
    {

        private string PrimaryKey { get; set; }
        private string Table { get; set; }
        public int NextId { get; set; }
        public GetNextId(PgConnection pg, DBTables tables, string eMessage, string pk) : base(pg, eMessage)
        {
            PrimaryKey = pk;
            Table = tables.Products;
            this.ResultJson = (string)ExecuteQuery();
        }

        public override string BuildSqlString()
        {
            var sqlstr = $"SELECT MAX({PrimaryKey}) FROM {Table}";
            return sqlstr;
        }
        public override object ExtractData(ref NpgsqlDataReader reader)
        {
            var nextMax = 0;
            while (reader.Read())
            {
                try
                {
                    nextMax = reader.GetInt32(0) + 1;
                }
                catch
                {
                    this.NextId = 1;
                    return 1.ToString();
                }
            }
            this.NextId = nextMax;
            return (nextMax).ToString();
        }
    }
}
