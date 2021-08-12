using loginservice.Controllers;
using loginservice.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace loginservice.PostgresQueries
{
    public class AddSellerAccount : PgWriteQuery
    {
        private SellerSignupParams P {get;}
        private DBTables DbTables { get; }
        public AddSellerAccount(PgConnection pg, string eMesssage,SellerSignupParams signupParams, DBTables dBTables ): base(pg,eMesssage)
        {
            this.P = signupParams;
            this.DbTables = dBTables;
            this.ResultJson = ExecuteQuery();
        }
        public override string BuildSqlString()
        {
            var sellerSql = $"INSERT INTO {DbTables.SellerAccounts}" +
                            $" VALUES(" +
                            $"'{P.sellerId}'," +
                            $"'{P.creationDate}'," +
                            $"'{P.businessType}'," +
                            $"'{P.name}'," +
                            $"'{P.ein}'," +
                            $"'{P.address}'," +
                            $"'{P.city}'," +
                            $"'{P.state}'," +
                            $"'{P.zipcode}'," +
                            $"'{P.upc}'," +
                            $"'{P.manufacturer}'," +
                            $"'{P.trademark}'," +
                            $"'{P.verificationDoc}');";

            var contactSql = $"INSERT INTO {DbTables.SellerContacts}" +
                             $" VALUES(" +
                             $"'{P.contactId}'," +
                             $"'{P.sellerId}'," +
                             $"'{P.creationDate}'," +
                             $"'{P.contactFirstName}'," +
                             $"'{P.contactLastName}'," +
                             $"'{P.contactDob}'," +
                             $"'{P.idType}'," +
                             $"'{P.idFront}'," +
                             $"'{P.idBack}'," +
                             $"'{P.email.ToLower()}'," +
                             $"'{P.phone}'," +
                             $"'{P.ownerOrRep}');";
            var bankSql = $"INSERT INTO {DbTables.BankAccounts}" +
                          $" VALUES(" +
                          $"'{P.bankId}'," +
                          $"'{P.sellerId}'," +
                          $"'{P.bankInstituion}'," +
                          $"'{P.bankCountry}'," +
                          $"'{P.bankHolderName}'," +
                          $"'{P.bankRoutingNum}'," +
                          $"'{P.bankAccNum}'," +
                          $"'{P.creationDate}');";

            var passwordSql = $"INSERT INTO {DbTables.SellerPasswords}" +
                              $" VALUES(" +
                              $"'{P.passwordId}'," +
                              $"'{P.sellerId}'," +
                              $"'{P.password}');";

            return sellerSql + " " + contactSql + " " + bankSql + " " + passwordSql;
        }

    }
}
