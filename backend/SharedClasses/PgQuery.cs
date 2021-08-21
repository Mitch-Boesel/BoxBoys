using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace SharedClasses
{
    public abstract class PgQuery
    {
        public string ResultJson { get; set; }
        protected PgConnection PgConnection { get; }
        protected string ErrorMessage { get;}

        public bool Exception { get; set; }
        public string ExceptionJsonString { get; }

        public PgQuery(PgConnection pg, string eMessage)
        {
            this.PgConnection = pg;
            this.ErrorMessage = eMessage;
            this.Exception = false;
            this.ExceptionJsonString = "Exception Thrown, Request Failed!";
        }
        public abstract object ExecuteQuery();

        public abstract string BuildSqlString();

        public string ToJson(object dictionary)
        {
            string json = JsonConvert.SerializeObject(dictionary, Formatting.Indented);
            return json;
        }
    }
}
