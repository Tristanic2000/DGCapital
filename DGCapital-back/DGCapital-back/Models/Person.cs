using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DGCapital_back.Models
{
    public class Person
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

        public string BirthdateDay { get; set; }
        public string BirthdateMonth { get; set; }
        public string BirthdateYear { get; set; }
      //  public int BirthdateId { get; set; }
       // public Birthdate Birthdate { get; set; }

    }

    //public class Birthdate
    //{
    //    public string id { get; set; }
    //    public Person Person { get; set; }
    //    public int personId { get; set; }

    //    public string day { get; set; }
    //    public string month { get; set; }
    //    public string year { get; set; }
    //}
}
