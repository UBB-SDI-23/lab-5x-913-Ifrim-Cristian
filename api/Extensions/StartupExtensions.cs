using api.Middleware;
using api.Data;
using api.Mappings;
using api.Repositories;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions;

public static class StartupExtensions
{
    public static IServiceCollection AddDataContext(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<DataContext>(options =>
        {
            var connectionString = config.GetConnectionString("MySQLConnection");
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        });
        return services;
    }

    public static IServiceCollection AddMappingProfiles(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(CigaretteMappings));
        services.AddAutoMapper(typeof(BrandMappings));
        services.AddAutoMapper(typeof(ClientMappings));
        services.AddAutoMapper(typeof(OrderMappings));
        return services;
    }

    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<ICigaretteRepository, CigaretteRepository>();
        services.AddScoped<IBrandRepository, BrandRepository>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IClientRepository, ClientRepository>();
        return services;
    }

    public static IServiceCollection AddMiddlewareServices(this IServiceCollection services)
    {
        services.AddSingleton<ErrorHandlerMiddleware>();
        return services;
    }
}
