using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace WohnVerwaltung.Models
{
    public class WohnDBContext : DbContext
    {
        public WohnDBContext(DbContextOptions<WohnDBContext> options)
       : base(options)
        {
        }

        public DbSet<Wohneinheit> WohnEinheiten { get; set; }


    }
}