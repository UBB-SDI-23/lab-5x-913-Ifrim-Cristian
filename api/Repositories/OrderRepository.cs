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

        public async Task<IList<Order>> GetByClientId(int id)
        {

            var orders = await _context.Orders
                            .Where(c => c.ClientId == id)
                            .Include(c => c.Cigarette)
                            .Include(c => c.Client)
                            .ToListAsync();
            return orders;
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