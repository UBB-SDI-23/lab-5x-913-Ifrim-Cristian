using api.Models;

namespace api.Repositories.Interfaces
{
    public interface IBrandRepository : IGenericRepository<Brand>
    {
        Task<bool> BrandExists(string name);
    }
}
 