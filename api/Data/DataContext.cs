using api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;  
using Microsoft.EntityFrameworkCore; 
namespace api.Data;

public class DataContext : IdentityDbContext<Client>
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cigarette>()
            .HasOne<Brand>(s => s.Brand)
            .WithMany(c => c.Cigarettes)
            .HasForeignKey(s => s.BrandId);

        modelBuilder.Entity<Order>()
            .HasOne<Client>(o => o.Client)
            .WithMany(o => o.Orders)
            .HasForeignKey(o => o.ClientId);

        modelBuilder.Entity<Order>()
            .HasOne<Cigarette>(o => o.Cigarette)
            .WithMany(o => o.Orders)
            .HasForeignKey(o => o.CigaretteId);


        base.OnModelCreating(modelBuilder);

    }

    public DbSet<Cigarette> Cigarettes { get; set; } = default!;
    public DbSet<Brand> Brands { get; set; } = default!;
    public DbSet<Client> Clients { get; set; } = default!;
    public DbSet<Order> Orders { get; set; } = default!;
}