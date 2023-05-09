using api.Data;
using api.Models;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class ClientRepository : GenericRepository<Client>, IClientRepository
    {
        private readonly DataContext _context;
        public ClientRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public override async Task<Client?> GetById(int id)
        {
            return  await _context.Clients
                            .Include(o => o.Orders)
                            .ThenInclude(c => c.Cigarette)
                            .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Client?> GetClientByEmail(string email)
        {
            return await _context.Clients
                            .Include(o => o.Orders)
                            .FirstOrDefaultAsync(c => c.Email == email);
        }
        
        public async Task<bool> ClientExists(string email)
        {
            return await _context.Clients
                            .AnyAsync(c => c.Email == email);
        }
    }
}