using loginservice.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace loginservice.PostgresQueries
{
    public class NextAvailableId: PgReadQuery
    {

        public string PrimaryKey { get; set; }
        public string Table { get; set; }
        public int NextId { get; set; }
        public NextAvailableId(string idType, PgConnection pg, DBTables tables, PrimaryKeys pks,string eMessage) : base(pg, eMessage)
        {
            switch(idType)
            {
                case "seller":
                    this.PrimaryKey = pks.sellerPk;
                    this.Table = tables.SellerAccounts;
                    break;
                case "contact":
                    this.PrimaryKey = pks.contactPk;
                    this.Table = tables.SellerContacts;
                    break;
                case "bank":
                    this.PrimaryKey = pks.bankPk;
                    this.Table = tables.BankAccounts;
                    break;
                case "spassword":
                    this.PrimaryKey = pks.passwordPk;
                    this.Table = tables.SellerPasswords;
                    break;
                default:
                    throw new Exception("Wrong parameters for Next Available ID");

            }
            this.ResultJson = ExecuteQuery();
        }

        public override string BuildSqlString()
        {
            var sqlstr = $"SELECT MAX({this.PrimaryKey}) FROM {this.Table}";
            return sqlstr;
        }
        public override string ExtractData(ref NpgsqlDataReader reader)
        {
            var nextMax = 0;
            while (reader.Read())
            {
               nextMax = reader.GetInt32(0) + 1;
            }
            this.NextId = nextMax;
            return (nextMax).ToString();
        }
    }
}
