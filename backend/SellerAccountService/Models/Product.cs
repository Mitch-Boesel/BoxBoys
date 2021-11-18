﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SellerAccountService.Models
{
    public class Product
    {
        public long ProductID { get;}
        public int SellerID { get;}
        public DateTime UploadDate { get; }
        public string Category { get;}
        public string Title { get; }
        public string Brand { get;}
        public string Manufacturer { get;}
        public double Price { get;}
        public string Size { get;}
        public string Style { get; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Quantity { get;}
        public string Condition { get;}
        public bool Buyerpickup { get;}
        public string Description { get;}


        public Product() { }
        public Product(Dictionary<string,string> pairs, long productID)
        {
            ProductID = productID;
            SellerID = int.Parse(pairs["sellerid"]);
            UploadDate = DateTime.Now;
            Category = pairs["category"];
            Title = pairs["title"];
            Brand = pairs["brand"];
            Manufacturer = pairs["manufacturer"];
            Price = double.Parse(pairs["price"]);
            Size = pairs["size"];
            Style = pairs["style"];
            Address = pairs["address"];
            City = pairs["city"];
            State = pairs["state"];
            ZipCode = pairs["zipcode"];
            Quantity = pairs["quantity"];
            Condition = pairs["condition"];
            Buyerpickup = bool.Parse(pairs["buyerpickup"]);
            Description = pairs["description"];
        }

        public Product(Dictionary<string, string> pairs)
        {
            ProductID = long.Parse(pairs["productid"]);
            Category = pairs["category"];
            Title = pairs["title"];
            Brand = pairs["brand"];
            Manufacturer = pairs["manufacturer"];
            Price = double.Parse(pairs["price"]);
            Size = pairs["size"];
            Style = pairs["style"];
            Address = pairs["address"];
            City = pairs["city"];
            State = pairs["state"];
            ZipCode = pairs["zipcode"];
            Quantity = pairs["quantity"];
            Condition = pairs["condition"];
            Buyerpickup = bool.Parse(pairs["buyerpickup"]);
            Description = pairs["description"];
        }
    }
}
