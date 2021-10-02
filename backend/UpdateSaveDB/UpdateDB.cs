using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SharedClasses;

namespace UpdateSaveDB
{
    public static class UpdateDB
    {

        public static void SaveToLocal(PgConnection Pg, TableNames Tables)
        {
            foreach (var table in Tables.Tables)
            {
                var query = new SelectStar(Pg, table);
                var rows = query.Results;
                StreamWriter file = new StreamWriter($"./DBBackupFiles/{table}.txt", append:false);

                foreach (var row in rows)
                    file.WriteLine(row);

                file.Close();
            }
            
        }

        public static void UpdateDbFromLocal(PgConnection Pg, TableNames Tables)
        {
            foreach (var table in Tables.Tables)
            {
                StreamReader file = new StreamReader($"./DBBackupFiles/{table}.txt");
                var list = new List<string>();

                var line = string.Empty;
                while ((line = file.ReadLine()) != null)
                    list.Add($"({line})");

                file.Close();

                var query = new UpdateTable(Pg, table, list);

            }
        }
    }
}
