using api.Data;
using api.Models;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        private readonly DataContext _context;
        public OrderRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IList<Order>> GetByClientId(int id, int page = 1, int pageSize = 30)
        {
            return await _context.Orders
                            .Where(c => c.ClientId == id)
                            .Include(c => c.Cigarette)
                            .Include(c => c.Client)
                            .OrderBy(o => o.OrderId)
                            .ThenByDescending(o => o.OrderDate)
                            .Skip((page - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();
        }

        public override async Task<Order?> GetById(int id)
        {
            var order = await _context.Orders
                                .Include(c => c.Client)
                                .Include(c => c.Cigarette)
                                .FirstOrDefaultAsync(o => o.OrderId == id);

            return order;
        }
    }
}