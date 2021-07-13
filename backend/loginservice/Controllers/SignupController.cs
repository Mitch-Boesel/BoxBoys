using loginservice.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace loginservice.Controllers
{
    //[EnableCors("MyPolicy")]
    [Route("api/mcc/newaccount")]
    [ApiController]
    public class SignupController : ControllerBase
    {

        public readonly PgConnection pgConnection;
        public readonly DBAuthTables authTables;
        public readonly ILogger<SignupController> logger;

        public SignupController(PgConnection pg, DBAuthTables dBAuth, ILogger<SignupController> ilogger)
        {
            this.pgConnection = pg;
            this.authTables = dBAuth;
            this.logger = ilogger;
        }

        [HttpPost("sellersignup")]
        public string NewSellerAccount([FromBody]JObject data)
        {
            logger.LogInformation("Hit SELLERSIGNUP");
            var d = data.ToString();


            try
            {
                var dataDict = JsonConvert.DeserializeObject<Dictionary<string, string>>(d);
                var signupParams = new SellerSignupParams(dataDict);
            }
            catch(Exception e)
            {
                logger.LogWarning(e.Message);
                logger.LogWarning("COULD NOT CREATE NEW SELLER ACCOUNT");
                return "Seller Account Creation Was UNSUCCESSFUL";
            }

            return String.Empty;
        }
        /*
        [HttpPost]
        [HttpPost("data")]
        //[EnableCors("*")]
        public string Post([FromBody] JObject data)
        {
            var d = data.ToString();
            try
            {
                var newPurchase = JsonConvert.DeserializeObject<Purchase>(d);
                var query = new PostNewPurchase(newPurchase, PostgresConnection);
                if (query.ResultJson == "SQl Error, Request Failed!")
                {
                    Logger.LogWarning("POST new purchase UNSUCCESSFUL");
                    return "Purchase Save Was UNSUCCESSFUL";
                }
                Logger.LogWarning("POST new purchase SUCCESSFUL");
                return "Purchase Successfully Saved!";
            }
            catch (Exception e)
            {
                Logger.LogWarning(e.Message);
                Logger.LogWarning("POST new purchase UNSUCCESSFUL");
                return "Purchase Save Was UNSUCCESSFUL";
            }
        }
        
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
