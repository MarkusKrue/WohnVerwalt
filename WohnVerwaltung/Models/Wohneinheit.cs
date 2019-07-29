using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace WohnVerwaltung.Models
{
    public class Wohneinheit
    {
        public long Id { get; set; }

        [StringLength(50)]
        [Required]
        public string Bezeichnung { get; set; }
   
        [StringLength(255)]
        [Required]
        public string Strasse { get; set; }

        [Range(10000, 99999)]
        [DataType(DataType.Currency)]
        public long PLZ { get; set; }

        [StringLength(255)]
        [Required]
        public string Ort { get; set; }

        public bool IstInaktiv { get; set; }
    }
}