using loginservice.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace loginservice.PostgresQueries
{
    public class NextAvailableId: PgQuery
    {

        public string primaryKey { get; set; }
        public string table { get; set; }
        public NextAvailableId(string idType, PgConnection pg, DBTables tables, PrimaryKeys pks,string eMessage) : base(pg, eMessage)
        {
            switch(idType)
            {
                case "seller":
                    this.primaryKey = pks.sellerPk;
                    this.table = tables.SellerAccounts;
                    break;
                case "contact":
                    this.primaryKey = pks.contactPk;
                    this.table = tables.SellerContacts;
                    break;
                case "bank":
                    this.primaryKey = pks.bankPk;
                    this.table = tables.BankAccounts;
                    break;
                case "spassword":
                    this.primaryKey = pks.passwordPk;
                    this.table = tables.SellerPasswords;
                    break;
                default:
                    throw new Exception("Wrong parameters for Next Available ID");

            }
            this.resultJson = ExecuteQuery();
        }

        public override string BuildSqlString()
        {
            var sqlstr = $"SELECT {this.primaryKey} FROM {this.table}";
            return sqlstr;
        }
        public override string ExtractData(ref NpgsqlDataReader reader)
        {
            var counter = 0;
            while (reader.Read())
            {
                counter += 1;
            }
            return (counter + 1).ToString();
        }
    }
}
