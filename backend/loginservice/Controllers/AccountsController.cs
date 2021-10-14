using loginservice.Models;
using loginservice.PostgresQueries.ReadQueries;
using loginservice.PostgresQueries;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using SharedClasses;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace loginservice.Controllers
{
    //[EnableCors("MyPolicy")]
    [Route("api/mcc/accounts")]
    [ApiController]
    public class AccountsController : ControllerBase
    {

        public readonly PgConnection PgConnection;
        public readonly DBTables DbTables;
        public readonly ILogger<AccountsController> Logger;
        public readonly ErrorMessages EMessages;
        public readonly PrimaryKeys PrimaryKeys;

        public AccountsController(PgConnection pg, DBTables dBAuth, ILogger<AccountsController> ilogger, ErrorMessages errorMessages, PrimaryKeys pks)
        {
            this.PgConnection = pg;
            this.DbTables = dBAuth;
            this.Logger = ilogger;
            this.EMessages = errorMessages;
            this.PrimaryKeys = pks;
        }

        [HttpPost("seller-signup")]
        public IActionResult NewSellerAccount([FromBody]JObject data)
        {
            Logger.LogInformation("Hit SELLERSIGNUP");

            try
            {
                var d = data.ToString();
                var dataDict = JsonConvert.DeserializeObject<Dictionary<string, string>>(d);

                var copyCheck = new CheckDuplicateEmail("Seller",dataDict["email"],DbTables,PgConnection,EMessages.AddSellerAccount);
                if (!copyCheck.Valid)
                    return BadRequest(copyCheck.ResultJson);
                var p = new SellerSignupParams(dataDict);

                var sellerObj = new NextAvailableId("seller", PgConnection, DbTables, PrimaryKeys, EMessages.NextId);
                p.sellerId = sellerObj.NextId;

                var contactObj = new NextAvailableId("contact", PgConnection, DbTables, PrimaryKeys, EMessages.NextId);
                p.contactId = contactObj.NextId;

                var bankObj = new NextAvailableId("bank", PgConnection, DbTables, PrimaryKeys, EMessages.NextId);
                p.bankId = bankObj.NextId;

                var passwordObj = new NextAvailableId("spassword", PgConnection, DbTables, PrimaryKeys, EMessages.NextId);
                p.passwordId = passwordObj.NextId;

                var addSeller = new AddSellerAccount(PgConnection,EMessages.AddSellerAccount,p,DbTables);

                if (addSeller.Exception)
                {
                    Logger.LogError("SQL Insert Failed");
                    Logger.LogError(EMessages.AddSellerAccount);
                    return BadRequest(EMessages.AddSellerAccount);
                }

                Logger.LogInformation("New Seller Account created successfully");
                return Ok(p.sellerId);

            }
            catch(Exception e)
            {
                Logger.LogError(e.Message);
                Logger.LogError(EMessages.AddSellerAccount);
                return BadRequest(EMessages.AddSellerAccount); ;
            }
        }

        [HttpGet("seller-login")]
        public IActionResult SellerLogin(string email, string password)
        {
            Logger.LogInformation("Hit SELLERLOGIN");
            try
                {

                var loginAttempt = new UserLogin("Seller", email, password, DbTables, PgConnection, EMessages.SellerLogin);
                if (loginAttempt.Exception)
                {
                    Logger.LogError("SQL Find Failed");
                    Logger.LogError(EMessages.SellerLogin);
                    return BadRequest(loginAttempt.ResultJson);

                    //return StatusCode((int)HttpStatusCode.BadRequest, EMessages.SellerLogin);
                }
                else if (!loginAttempt.Valid)
                {
                    Logger.LogWarning("Invalid Login Credentials");
                    Logger.LogWarning(EMessages.SellerLogin);
                    return BadRequest(EMessages.SellerLogin);
                    //return StatusCode((int)HttpStatusCode.BadRequest, EMessages.SellerLogin);
                }
                Logger.LogInformation("Seller Login was Validated SUCCESSFULLY");
                return Ok(loginAttempt.ResultJson);
                //return StatusCode((int)HttpStatusCode.OK);


            }
            catch(Exception e)
            {
                Logger.LogError(e.Message);
                Logger.LogError(EMessages.SellerLogin);
                return BadRequest(EMessages.SellerLogin);
            }

        }

        /*
        
        // GET: api/<SignupController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<SignupController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SignupController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SignupController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SignupController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        */
    }
}
