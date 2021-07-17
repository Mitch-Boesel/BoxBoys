using loginservice.Models;
using Newtonsoft.Json;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace loginservice.PostgresQueries
{
    public abstract class PgQuery
    {
        public string resultJson { get; set; }
        public PgConnection pgConnection { get; }
        public string errorMessage { get; set; }

        public PgQuery(PgConnection pg, string eMessage)
        {
            this.pgConnection = pg;
            this.errorMessage = eMessage;
        }
        public string ExecuteQuery()
        {
            var sqlstr = BuildSqlString();
            using (var connection = new NpgsqlConnection(this.pgConnection.ConnectionString()))
            {
                string jsonString = string.Empty;
                connection.Open();
                var trans = connection.BeginTransaction();
                using (var cmd = new NpgsqlCommand(sqlstr,connection))
                {
                    cmd.Transaction = trans;
                    try
                    {
                        var reader = cmd.ExecuteReader();
                        //var numRows = cmd.ExecuteNonQuery();
                        jsonString = ExtractData(ref reader);
                        reader.Close();
                        trans.Commit();
                    }
                    catch (NpgsqlException ex)
                    {
                        Console.WriteLine(ex.Message.ToString());
                        Console.WriteLine("SQL Error - " + ex.Message.ToString());  // errorMessage
                        jsonString = "SQl Error, Request Failed!";  // errorMessage
                        trans.Rollback();
                    }
                    finally
                    {
                        connection.Close();
                    }

                    return jsonString;
                }
            }
        }

        public abstract string BuildSqlString();

        /// <summary>
        /// Should use ToJson() method
        /// </summary>
        /// <param name="reader"></param>
        /// <returns></returns>
        public abstract string ExtractData(ref NpgsqlDataReader reader);

        public string ToJson(object dictionary)
        {
            string json = JsonConvert.SerializeObject(dictionary, Formatting.Indented);
            return json;
        }
    }
}
