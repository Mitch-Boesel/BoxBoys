using System;
using System.Collections.Generic;
using System.Text;
using Npgsql;

namespace SharedClasses
{
    public abstract class PgReadQuery : PgQuery
    {
        public PgReadQuery(PgConnection pg, string eMessage) : base(pg, eMessage)
        {

        }

        public abstract object ExtractData(ref NpgsqlDataReader reader);

        public override object ExecuteQuery()
        {
            var sqlstr = BuildSqlString();
            using (var connection = new NpgsqlConnection(this.PgConnection.ConnectionString()))
            {
                object jsonString;

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
                        jsonString = this.ExceptionJsonString;  // errorMessage
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
