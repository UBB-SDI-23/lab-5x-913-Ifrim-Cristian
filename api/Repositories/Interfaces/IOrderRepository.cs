using api.Models;

namespace api.Repositories.Interfaces
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Task<IList<Order>> GetByClientId(int id, int page = 1, int pageSize = 30);
    }
}