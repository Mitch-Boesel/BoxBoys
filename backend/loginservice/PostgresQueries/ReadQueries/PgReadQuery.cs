using loginservice.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace loginservice.PostgresQueries
{
    public abstract class PgReadQuery : PgQuery
    {
        public PgReadQuery(PgConnection pg, string eMessage): base(pg, eMessage)
        {

        }

        public abstract string ExtractData(ref NpgsqlDataReader reader);

        public override string ExecuteQuery()
        {
            var sqlstr = BuildSqlString();
            using (var connection = new NpgsqlConnection(this.PgConnection.ConnectionString()))
            {
                string jsonString = string.Empty;
                connection.Open();
                using (var cmd = new NpgsqlCommand(sqlstr, connection))
                {
                    try
                    {
                        var reader = cmd.ExecuteReader();

                        jsonString = ExtractData(ref reader);
                        reader.Close();
                    }
                    catch (Exception ex)
                    {
                        this.Exception = true;
                        Console.WriteLine(ex.Message.ToString());
                        jsonString = "SQL Exception Thrown, Request Failed!";  // errorMessage
                    }
                    finally
                    {
                        connection.Close();
                    }

                    return jsonString;
                }
            }
        }
    }
}
