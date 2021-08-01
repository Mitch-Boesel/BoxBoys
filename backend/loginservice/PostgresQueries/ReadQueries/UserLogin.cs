using loginservice.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace loginservice.PostgresQueries
{
    public class UserLogin : PgReadQuery
    {
        public string Email { get; }
        public string Password { get; }
        public string AccountTable { get; }
        public string PasswordTable { get; }
        public string MyProperty { get; set; }
        public string ID { get; set; }

        public bool Valid { get; }
        public UserLogin(string userType, string email, string password, DBTables dbTables,PgConnection pg, string eMessage) :base(pg, eMessage)
        {
            Email = email;
            Password = password;

            switch(userType)
            {
                case "Seller":
                    AccountTable = dbTables.SellerContacts;
                    PasswordTable = dbTables.SellerPasswords;
                    ID = "sellerid";
                    break;
                case "Buyer":
                    AccountTable = dbTables.BuyerAccounts;
                    PasswordTable = dbTables.BuyerPasswords;
                    ID = "buyerid";
                    break;
                default:
                    throw new Exception("Invalid userType Parameter");

            }

            this.ResultJson = ExecuteQuery();
            this.Valid = bool.Parse(this.ResultJson);
        }

        public override string BuildSqlString()
        {
            var sqlstring = "Select *" +
                            $" From {AccountTable} a INNER JOIN {PasswordTable} p" +
                            $" ON a.{ID} = p.{ID}" +
                            $" WHERE a.email = '{Email}' AND p.password = '{Password}';";
            return sqlstring;
        }

        public override string ExtractData(ref NpgsqlDataReader reader)
        {
            if (reader.HasRows)
                return bool.TrueString;
            else
                return bool.FalseString;
        }
    }
}
