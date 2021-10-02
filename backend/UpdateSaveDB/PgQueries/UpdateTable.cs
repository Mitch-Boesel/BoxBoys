using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SharedClasses;

namespace UpdateSaveDB
{
    public class UpdateTable : PgWriteQuery
    {
        private string Table { get;}
        public List<string> Values { get;}
        public UpdateTable(PgConnection pg, string table, List<string> values): base(pg, "Updating DB from local Failed:(")
        {
            Table = table;
            Values = values;
            ExecuteQuery();
        }
        public override string BuildSqlString()
        {
            var sqlString = $"DELETE FROM {Table};" +
                            $" INSERT INTO {Table}" +
                            $" VALUES {string.Join(",", Values)};";

            return sqlString;
                           
        }
    }
}
