using api.Models;

namespace api.Repositories.Interfaces
{
    public interface IBrandRepository : IGenericRepository<Brand>
    {
        Task<bool> BrandExists(string name);
        Task<IEnumerable<Brand>> GetByName(string name="", int page=1, int pageSize=7);
    }
}
 