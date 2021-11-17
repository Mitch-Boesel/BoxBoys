using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SharedClasses;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using SellerAccountService.Models;
using SellerAccountService.Queries;

namespace SellerAccountService.Controllers
{
    [Route("api/mcc/seller-account")]
    [ApiController]
    public class SellerController : ControllerBase
    {
        public PgConnection PgConnection { get; }
        public DBTables DbTables { get; }
        public ILogger<SellerController> Logger { get; }
        private PrimaryKeys PrimaryKeys { get; }

        public SellerController(PgConnection pg, DBTables dBAuth, ILogger<SellerController> ilogger, PrimaryKeys pks)
        {
            PgConnection = pg;
            DbTables = dBAuth;
            Logger = ilogger;
            PrimaryKeys = pks;
        }


        [HttpPost("new-product")]
        public IActionResult NewProduct([FromBody] JObject data)
        {
            const string eMessage = "Unable to Add the New Product:(";
            try
            {
                var d = data.ToString();
                var dataDict = JsonConvert.DeserializeObject<Dictionary<string, string>>(d);
                if(bool.Parse(dataDict["sameAddress"]))
                {
                    var sellerID = int.Parse(dataDict["sellerid"]);
                    var sellerAddress = new GetAddress(PgConnection, DbTables, sellerID);
                    dataDict["address"] = sellerAddress.FullAddress.Address;
                    dataDict["city"] = sellerAddress.FullAddress.City;
                    dataDict["state"] = sellerAddress.FullAddress.State;
                    dataDict["zipcode"] = sellerAddress.FullAddress.Zipcode.ToString();
                }

                var productID = new GetNextId(PgConnection, DbTables, eMessage, PrimaryKeys.ProductPK);
                var newProduct = new Product(dataDict, productID.NextId);
                var addProduct = new AddProduct(PgConnection, eMessage, newProduct, DbTables);

                if (addProduct.Exception)
                {
                    Logger.LogError("SQL Insert Failed");
                    return BadRequest(eMessage);
                }

                Logger.LogInformation("New Product created successfully");
                return Ok(productID.NextId);
            }
            catch (Exception e)
            {
                Logger.LogError(e.Message);
                Logger.LogError(eMessage);
                return BadRequest(eMessage); ;
            }
        }

        [HttpPost("update-product")]
        public IActionResult UpdateProduct([FromBody] JObject data)
        {
            var d = data.ToString();
            var p = new Product(JsonConvert.DeserializeObject<Dictionary<string, string>>(d));
            var updateQuery = new UpdateProduct(PgConnection, DbTables.Products, p);

            if (updateQuery.Exception)
            {
                Logger.LogError("Update Product Failed");
                return BadRequest("Update Product Failed:(");
            }

            return Ok();

        }

        [HttpGet("number-products")]
        public IActionResult NumberOfProducts(string sellerid)
        {
            Logger.LogInformation("Hit NumberOfProducts");
            const string eMessage = "Getting Number of Products Failed:(";
            try
            {
                var numProducts = new NumProducts(PgConnection, eMessage, int.Parse(sellerid), DbTables);
                if (numProducts.Exception)
                {
                    Logger.LogWarning(eMessage);
                    return BadRequest(eMessage); 
                }
                return Ok(numProducts.ResultJson);
            }
            catch(Exception e)
            {
                Logger.LogWarning(eMessage);
                return BadRequest(eMessage);
            }
        }

        [HttpGet("seller-products")]
        public IActionResult GetSellerProducts(string sellerid)
        {
            Logger.LogInformation("HIT GetSellerProducts!");
            var productQuery = new GetProducts(PgConnection, sellerid, DbTables.Products);

            if (productQuery.Exception)
            {
                Logger.LogWarning($"Retrieving all products for seller {sellerid} failed:(");
                return BadRequest();
            }
            return Ok(productQuery.ResultJson);
        }

        /*
        // GET: SellerAccountController
        public ActionResult Index()
        {
            return View();
        }

        // GET: SellerAccountController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: SellerAccountController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: SellerAccountController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: SellerAccountController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: SellerAccountController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: SellerAccountController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: SellerAccountController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }*/
    }
}
