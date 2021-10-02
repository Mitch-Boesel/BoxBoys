using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SharedClasses;
using Npgsql;

namespace UpdateSaveDB
{
    public class SelectStar : PgReadQuery
    {
        private string Table { get;}
        private PgConnection Pg { get; }
        public List<String> Results { get;}
        public SelectStar(PgConnection pg, string table) : base(pg, "Select * failed")
        {
            Pg = pg;
            Table = table;
            Results = (List<string>)ExecuteQuery();
        }
        public override string BuildSqlString()
        {
            var sqlString = $"SELECT * FROM {Table};";
            return sqlString;
        }

        public override object ExtractData(ref NpgsqlDataReader reader)
        {
            var rows = new List<string>();
            var count = reader.FieldCount;
            while(reader.Read())
            {
                var l = new List<string>(count);
                for(var i=0; i <count; i++)
                {
                    l.Add(reader.GetValue(i).ToString());
                }
                rows.Add("'" + string.Join("','", l) + "'");
            }
            return rows;
        }
    }
}
