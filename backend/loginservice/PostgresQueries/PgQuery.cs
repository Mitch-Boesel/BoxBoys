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
        public string ResultJson { get; set; }
        public PgConnection PgConnection { get; }
        public string ErrorMessage { get; set; }

        public bool Exception { get; set; }

        public PgQuery(PgConnection pg, string eMessage)
        {
            this.PgConnection = pg;
            this.ErrorMessage = eMessage;
            this.Exception = false;
        }
        public abstract string ExecuteQuery();
        //{
        //    var sqlstr = BuildSqlString();
        //    using (var connection = new NpgsqlConnection(this.PgConnection.ConnectionString()))
        //    {
        //        string jsonString = string.Empty;
        //        connection.Open();
        //        var trans = connection.BeginTransaction();
        //        using (var cmd = new NpgsqlCommand(sqlstr,connection))
        //        {
        //            cmd.Transaction = trans;
        //            try
        //            {
        //                var reader = cmd.ExecuteReader();
        //                //var numRows = cmd.ExecuteNonQuery();
        //                jsonString = ExtractData(ref reader);
        //                reader.Close();
        //                trans.Commit();
        //            }
        //            catch (Exception ex)
        //            {
        //                this.Exception = true;
        //                Console.WriteLine(ex.Message.ToString());
        //                jsonString = "Exception Thrown, Request Failed!";  // errorMessage
        //                trans.Rollback();
        //            }
        //            finally
        //            {
        //                connection.Close();
        //            }

        //            return jsonString;
        //        }
        //    }
        //}

        public abstract string BuildSqlString();

        public string ToJson(object dictionary)
        {
            string json = JsonConvert.SerializeObject(dictionary, Formatting.Indented);
            return json;
        }
    }
}
