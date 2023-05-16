using api.Middleware;
using api.Data;
using api.Mappings;
using api.Repositories;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.IdentityModel.Tokens;

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

    public static IServiceCollection AddIdentity(this IServiceCollection services)
    {
        services.AddIdentity<Client, IdentityRole>(options =>
        {
            options.Password.RequireDigit = false;
            options.Password.RequiredLength = 6;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
        })
        .AddEntityFrameworkStores<DataContext>()
        .AddDefaultTokenProviders();
        return services;
    }

    public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration config)
    {
        var key = Encoding.ASCII.GetBytes(config["JWT:Secret"]!);
        services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })  
        .AddJwtBearer(x =>  
        {  
            x.RequireHttpsMetadata = false;  
            x.SaveToken = true;  
            x.TokenValidationParameters = new TokenValidationParameters  
            {  
                ValidateIssuerSigningKey = true,  
                IssuerSigningKey = new SymmetricSecurityKey(key),  
                ValidateIssuer = true,  
                ValidateAudience = true,  
                ValidIssuer = config["JWT:ValidIssuer"],  
                ValidAudience = config["JWT:ValidAudience"],  
                RequireExpirationTime = true,  
                ClockSkew = TimeSpan.Zero  
            };  
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
