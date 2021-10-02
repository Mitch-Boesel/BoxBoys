using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SharedClasses;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace UpdateSaveDB.Controllers
{
    [Route("api/mcc/db/")]
    [ApiController]
    public class UpdateSaveDBController : ControllerBase
    {

        public PgConnection PgConnection { get; }
        public TableNames Tables { get; }
        public ILogger<UpdateSaveDBController> Logger { get; }

        public UpdateSaveDBController(PgConnection pg, TableNames tables, ILogger<UpdateSaveDBController> ilogger)
        {
            PgConnection = pg;
            Tables = tables;
            Logger = ilogger;
        }

        [HttpPost("write-to-local")]
        public IActionResult WriteDataToLocal()
        {
            UpdateDB.SaveToLocal(PgConnection, Tables);
            return Ok();
        }

        [HttpPost("read-from-local")]
        public IActionResult UpdateLocalToDB()
        {
            UpdateDB.UpdateDbFromLocal(PgConnection, Tables);
            return Ok();
        }

    }
}
