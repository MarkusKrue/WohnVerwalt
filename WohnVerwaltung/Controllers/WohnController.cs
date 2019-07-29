using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WohnVerwaltung.Models;


namespace WohnVerwaltung.Controllers
{
    [Route("api/wohn")]
    [ApiController]
    public class WohnController : ControllerBase
    {
        private readonly WohnDBContext _context;

        public WohnController(WohnDBContext context)
        {
            _context = context;

            if (!(_context.WohnEinheiten.Count() > 0))
            {
                //Initialisieren mit einer Wohnung
                _context.WohnEinheiten.Add(new Wohneinheit {
                    Strasse = "Neue Strasse 32",
                    Bezeichnung = "WohnEinh 001",
                    Ort = "Ratingen",
                    PLZ = 40882,
                    IstInaktiv = false
                });
                _context.SaveChanges();
            }
        }
        // GET: api/wohn
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Wohneinheit>>> GetWohnEinheiten()
        {
            return await _context.WohnEinheiten.ToListAsync();
        }

        // GET: api/wohn/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Wohneinheit>> GetWohnEinheit(long id)
        {
            var wohnEinheit = await _context.WohnEinheiten.FindAsync(id);

            if (wohnEinheit == null)
            {
                return NotFound();
            }

            return wohnEinheit;
        }
        // POST: api/wohn
        [HttpPost]
        public async Task<ActionResult<Wohneinheit>> PostWohneinheit(Wohneinheit item)
        {
            _context.WohnEinheiten.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWohnEinheit), new { id = item.Id }, item);
        }

        // PUT: api/wohn/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWohnEinheit(long id, Wohneinheit item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // DELETE: api/wohn/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWohnEinheit(long id)
        {
            var todoItem = await _context.WohnEinheiten.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            _context.WohnEinheiten.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
