using api.Models;

namespace api.Repositories.Interfaces;

public interface ICigaretteRepository : IGenericRepository<Cigarette>
{
    Task<bool> CigaretteExists(int brand, string model, string type);
    Task<IEnumerable<Cigarette>> GetCigarettesByPrice(float price);
}
