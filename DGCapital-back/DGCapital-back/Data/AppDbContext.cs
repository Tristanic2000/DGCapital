using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DGCapital_back.Models;
using Microsoft.EntityFrameworkCore;

namespace DGCapital_back.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Person> People { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Person>().ToTable("Person");
        }
    }
}
