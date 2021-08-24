using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using loginservice.Models;
using SharedClasses;

namespace loginservice.PostgresQueries.ReadQueries
{
    public class CheckDuplicateEmail : PgReadQuery
    {
        public string Email { get; }
        public string Table { get; }
        public bool Valid { get; }
        public string AlreadyExistsString { get;}
        public CheckDuplicateEmail(string userType, string email, DBTables tables, PgConnection pg, string eMessage) : base(pg, eMessage)
        {
            AlreadyExistsString = "Email provided is already associated with an account";
            Email = email.ToLower();
            switch(userType)
            {
                case "Seller":
                    Table = tables.SellerContacts;
                    break;
                case "Buyer":
                    Table = tables.BuyerAccounts;
                    break;
                default:
                    throw new Exception("Invalid userType Parameter");
            }
            ResultJson = (string)ExecuteQuery();
            Valid = ResultJson != AlreadyExistsString && !Exception? true : false;
        }
        public override string BuildSqlString()
        {
            var sqlStr = $"SELECT t.email" +
                        $" FROM {Table} t" +
                        $" WHERE t.email = '{Email}';";
            return sqlStr;
        }

        public override object ExtractData(ref NpgsqlDataReader reader)
        {
            if (reader.HasRows)
                 return AlreadyExistsString;
            else
                return bool.TrueString;
        }
    }
}
