using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace loginservice.Controllers
{
    public class SellerSignupParams
    {
        public string businessType { get; }
        public string address { get; }
        public string city { get;}
        public string state { get;}
        public string zipcode { get;}
        public string phone { get; }
        public string email { get; }
        public int ein { get; }
        public bool upc { get; }
        public bool manufacturer { get; }
        public bool trademark { get; }
        public byte[] verificationDoc { get; }
        public string contactFirstName { get;}
        public string contactLastName { get;}
        public DateTime contactDob { get;}
        public string idType { get;}
        public byte[] idFront { get;}
        public byte[] idBack { get; }
        public bool ownerOrRep { get;}
        public DateTime creationDate { get;}
        public string password { get;}
        public string bankInstituion { get;}
        public string bankCountry { get;}
        public string bankHolderName { get;}
        public int bankRoutingNum { get;}
        public int bankAccNum { get;}

        public SellerSignupParams(Dictionary<string,string> pairs)
        {
            this.address = pairs["address"];
            this.city = pairs["city"];
            this.state = pairs["state"];
            this.zipcode = pairs["zipcode"];
            this.bankAccNum = int.Parse(pairs["bankAccNum"]);
            this.bankHolderName = pairs["bankHoldername"];
            this.bankCountry = pairs["bankCountry"];
            this.bankInstituion = pairs["bankInstitution"];
            this.bankRoutingNum = int.Parse(pairs["bankRoutingnum"]);
            this.businessType = pairs["businessType"];
            this.contactDob = DateTime.Parse(pairs["contactDob"]);
            this.contactFirstName = pairs["contactName"];
            //this.contactLastName = pairs["contactLastname"];  // Create somekind of split funtion to first/last
            this.creationDate = DateTime.Now;
            this.ein = int.Parse(pairs["ein"]);
            this.email = pairs["email"];
            this.idBack = new byte[1];  // FIX THIS EVENTUALLY
            this.idFront = new byte[1]; // FIX THIS EVENTUALLY
            this.idType = pairs["idType"];
            this.manufacturer = bool.Parse(pairs["manufacturer"]);
            this.ownerOrRep = bool.Parse(pairs["owner"]);
            this.password = pairs["password"];
            this.phone = pairs["phone"];
            this.trademark = bool.Parse(pairs["trademark"]);
            this.upc = bool.Parse(pairs["upc"]);
            this.verificationDoc = new byte[1]; // FIX THIS EVENTUALLY
        }
    }
}
