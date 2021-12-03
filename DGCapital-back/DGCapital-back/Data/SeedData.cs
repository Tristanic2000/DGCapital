using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using DGCapital_back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DGCapital_back.Data
{
    public static class SeedData
    {
        public static void EnturePopulated(IApplicationBuilder app)
        {
            AppDbContext context = app.ApplicationServices
                .CreateScope().ServiceProvider.GetRequiredService<AppDbContext>();

            if (context.Database.GetPendingMigrations().Any())
            {
                context.Database.Migrate();
            }


            if (!context.People.Any())
            {
                context.People.AddRange(

                    new Person {  Name = "John", Surname="Stevens", BirthdateDay = "02", BirthdateMonth = "01", BirthdateYear = "2011" },
                    new Person { Name = "Peter", Surname = "Dudeson", BirthdateDay = "25", BirthdateMonth = "07", BirthdateYear = "1989" } ,
                    new Person {  Name = "Tristan", Surname = "Henderson", BirthdateDay = "03", BirthdateMonth = "08", BirthdateYear = "2000"  },
                    new Person { Name = "Pierre", Surname = "Putter", BirthdateDay = "10", BirthdateMonth = "08", BirthdateYear = "2000" } ,
                    new Person {  Name = "Ruan", Surname = "Bantjies", BirthdateDay = "25", BirthdateMonth = "07", BirthdateYear = "1934"  },
                    new Person { Name = "bish", Surname = "bosh", BirthdateDay = "30", BirthdateMonth = "12", BirthdateYear = "2019" } ,
                    new Person {  Name = "Ivailo", Surname = "Katzatov", BirthdateDay = "01", BirthdateMonth = "01", BirthdateYear = "1999"  },
                    new Person {  Name = "Calvin", Surname = "Westphal", BirthdateDay = "15", BirthdateMonth = "11", BirthdateYear = "2008"  },
                    new Person {  Name = "John", Surname = "Denver", BirthdateDay = "09", BirthdateMonth = "04", BirthdateYear = "1958" } ,
                    new Person {  Name = "Bradley", Surname = "Brinkley", BirthdateDay = "19", BirthdateMonth = "07", BirthdateYear = "1995"  }
                    ) ;
            }

            context.SaveChanges();
        }
    }
}
