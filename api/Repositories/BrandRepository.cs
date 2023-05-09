using api.Data;
using api.Models;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class BrandRepository : GenericRepository<Brand>, IBrandRepository
    {
        private readonly DataContext _context;
        public BrandRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<bool> BrandExists(string name)
        {
            return await _context.Brands.AnyAsync(b => b.Name == name);
        }

        public override async Task<Brand?> GetById(int id)
        {
            return await _context.Brands
                            .Include(c => c.Cigarettes)
                            .FirstOrDefaultAsync(b => b.Id == id);
        }

        public override async Task<IEnumerable<Brand>> GetAll()
        {
            return await _context.Brands
                            .Include(c => c.Cigarettes)
                            .ToListAsync();
        }
    }
}