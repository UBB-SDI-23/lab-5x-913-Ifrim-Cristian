using api.Models;

namespace api.Repositories.Interfaces
{
    public interface IClientRepository : IGenericRepository<Client>
    {
        Task<bool> ClientExists(string email);
        Task<Client?> GetClientByEmail(string email);
    }
}