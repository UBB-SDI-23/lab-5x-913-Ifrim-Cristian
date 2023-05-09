using api.Repositories.Interfaces;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class CigaretteRepository : GenericRepository<Cigarette>, ICigaretteRepository
{
    private readonly DataContext _context;
    public CigaretteRepository(DataContext context) : base(context)
    {
        _context = context;
    }

    public override async Task<IEnumerable<Cigarette>> GetAll()
    {
        return await _context.Cigarettes
                        .Include(u => u.Brand)
                        .ToListAsync();
    }

    public override async Task<Cigarette?> GetById(int id)
    {
        return await _context.Cigarettes
                        .Include(b => b.Brand)
                        .Include(o => o.Orders)
                        .FirstOrDefaultAsync(u => u.Id == id);
    }

    public Task<bool> CigaretteExists(int brand, string model, string type)
    {
        return _context.Cigarettes.AnyAsync(u => 
                        u.Brand.Id == brand
                        &&
                        u.Model == model
                        && 
                        u.Type == type
        );
    }

    public async Task<IEnumerable<Cigarette>> GetCigarettesByPrice(float price)
    {
        return await _context.Cigarettes
                        .Where(u => u.Price > price)
                        .Include(b => b.Brand)
                        .ToListAsync();
    }
}
