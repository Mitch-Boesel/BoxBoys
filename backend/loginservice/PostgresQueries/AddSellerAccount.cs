using loginservice.Controllers;
using loginservice.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace loginservice.PostgresQueries
{
    public class AddSellerAccount : PgQuery
    {
        private SellerSignupParams p {get;}
        private DBTables dBTables { get; }
        public AddSellerAccount(PgConnection pg, string eMesssage,SellerSignupParams signupParams, DBTables dBTables ): base(pg,eMesssage)
        {
            this.p = signupParams;
            this.dBTables = dBTables;
            this.resultJson = ExecuteQuery();
        }
        public override string BuildSqlString()
        {
            var sellerSql = $"INSERT INTO {dBTables.SellerAccounts}" +
                            $" VALUES(" +
                            $"'{p.sellerId}'," +
                            $"'{p.creationDate}'," +
                            $"'{p.businessType}'," +
                            $"'{p.name}'," +
                            $"'{p.ein}'," +
                            $"'{p.address}'," +
                            $"'{p.city}'," +
                            $"'{p.state}'," +
                            $"'{p.zipcode}'," +
                            $"'{p.phone}'," +
                            $"'{p.upc}'," +
                            $"'{p.manufacturer}'," +
                            $"'{p.trademark}'," +
                            $"'{p.verificationDoc}');";

            var contactSql = $"INSERT INTO {dBTables.SellerContacts}" +
                             $" VALUES(" +
                             $"'{p.contactId}'," +
                             $"'{p.sellerId}'," +
                             $"'{p.creationDate}'," +
                             $"'{p.contactFirstName}'," +
                             $"'{p.contactLastName}'," +
                             $"'{p.contactDob}'," +
                             $"'{p.idType}'," +
                             $"'{p.idFront}'," +
                             $"'{p.idBack}'," +
                             $"'{p.email}'," +
                             $"'{p.ownerOrRep}');";
            var bankSql = $"INSERT INTO {dBTables.BankAccounts}" +
                          $" VALUES(" +
                          $"'{p.bankId}'," +
                          $"'{p.sellerId}'," +
                          $"'{p.bankInstituion}'," +
                          $"'{p.bankCountry}'," +
                          $"'{p.bankHolderName}'," +
                          $"'{p.bankRoutingNum}'," +
                          $"'{p.bankAccNum}'," +
                          $"'{p.creationDate}');";

            var passwordSql = $"INSERT INTO {dBTables.SellerPasswords}" +
                              $" VALUES(" +
                              $"'{p.passwordId}'," +
                              $"'{p.sellerId}'," +
                              $"'{p.password}');";

            return sellerSql + " " + contactSql + " " + bankSql + " " + passwordSql;
        }
        public override string ExtractData(ref NpgsqlDataReader reader)
        {
            return "New Seller Account creation was SUCCESSFUL";
        }


    }
}
