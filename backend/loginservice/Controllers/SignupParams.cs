using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace loginservice.Controllers
{
    public class SignupParams
    {
        public string businessType { get; }
        public string address { get; }
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
        public string bankAccountholderName { get;}
        public int bankRoutingNum { get;}
        public int bankAccNum { get;}

        public SignupParams(Dictionary<string,string> pairs)
        {
            this.address = pairs["address"];
            this.bankAccNum = int.Parse(pairs["bankAccNum"]);
            this.bankAccountholderName = pairs["bankAccountholderName"];
            this.bankCountry = pairs["bankCountry"];
            this.bankInstituion = pairs["bankInstituion"];
            this.bankRoutingNum = int.Parse(pairs["bankRoutingNum"]);
            this.businessType = pairs["businessType"];
            this.contactDob = DateTime.Parse(pairs["contactDob"]);
            this.contactFirstName = pairs["contactFirstName"];
            this.contactLastName = pairs["contactLastName"];
            this.creationDate = DateTime.Now;
            this.ein = int.Parse(pairs["ein"]);
            this.email = pairs["email"];
            this.idBack = new byte[1];  // FIX THIS EVENTUALLY
            this.idFront = new byte[1]; // FIX THIS EVENTUALLY
            this.idType = pairs["idType"];
            this.manufacturer = bool.Parse(pairs["manufacturer"]);
            this.ownerOrRep = bool.Parse(pairs["ownerOrRep"]);
            this.password = pairs["password"];
            this.phone = pairs["phone"];
            this.trademark = bool.Parse(pairs["trademark"]);
            this.upc = bool.Parse(pairs["upc"]);
            this.verificationDoc = new byte[1]; // FIX THIS EVENTUALLY
        }
    }
}
