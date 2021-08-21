using System;
using System.Collections.Generic;
using System.Text;
using Npgsql;
namespace SharedClasses
{
    public abstract class PgWriteQuery : PgQuery
    {
        public PgWriteQuery(PgConnection pg, string eMessage) : base(pg, eMessage)
        {

        }

        public override object ExecuteQuery()
        {
            var sqlstr = BuildSqlString();
            using (var connection = new NpgsqlConnection(this.PgConnection.ConnectionString()))
            {
                object jsonString = String.Empty;
                connection.Open();
                var trans = connection.BeginTransaction();
                using (var cmd = new NpgsqlCommand(sqlstr, connection))
                {
                    cmd.Transaction = trans;
                    try
                    {
                        //var reader = cmd.ExecuteReader();
                        var numRows = cmd.ExecuteNonQuery();

                        jsonString = $"SQL query successful, {numRows} were effected";
                        trans.Commit();
                    }
                    catch (Exception ex)
                    {
                        this.Exception = true;
                        Console.WriteLine(ex.Message.ToString());
                        jsonString = this.ExceptionJsonString;  // errorMessage
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
    }
}
