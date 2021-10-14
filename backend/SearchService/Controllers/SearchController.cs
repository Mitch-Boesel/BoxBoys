using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SharedClasses;
using Microsoft.Extensions.Logging;
using SearchService.Queries;

namespace SearchService.Controllers
{
    [Route("api/mcc/search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        public readonly PgConnection PgConnection;
        public readonly DBTables DbTables;
        public readonly ILogger<SearchController> Logger;

        public SearchController(PgConnection pg, DBTables dBTables, ILogger<SearchController> ilogger)
        {
            PgConnection = pg;
            DbTables = dBTables;
            Logger = ilogger;
        }

        [HttpGet("seller-products")]
        public IActionResult GetSellerProducts(string sellerid)
        {
            Logger.LogInformation("HIT GetSellerProducts!");
            var productQuery = new GetSellerProducts(PgConnection, sellerid, DbTables.Products);

            if (productQuery.Exception)
            {
                Logger.LogWarning($"Retrieving all products for seller {sellerid} failed:(");
                return BadRequest();
            }
            return Ok(productQuery.ResultJson);
        }

        [HttpGet("get-products")]
        public IActionResult GetProducts(string category)
        {
            Logger.LogInformation("HIT GetProducts!");
            var productQuery = new GetProducts(PgConnection, DbTables.Products, category);

            if (productQuery.Exception)
            {
                Logger.LogWarning($"GetProducts for {category} failed;(");
                return BadRequest();
            }
            return Ok(productQuery.ResultJson);
        }

    }
}
