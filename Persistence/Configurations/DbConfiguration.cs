using System.Reflection;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Contexts;
using Persistence.Repositories;

namespace Persistence.Configurations;

public static class DbConfiguration
{
    public static void AddDbService(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(
            options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection"),
                    o => o.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName)
                )
        );
        services.AddScoped<IApplicationDbContext>(
            provider => provider.GetService<ApplicationDbContext>()
        );
        services.AddScoped<IUserRepository, UserRepository>();
    }

    public static async Task ApplyMigrations(this IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        await using ApplicationDbContext dbContext =
            scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        await dbContext.Database.MigrateAsync();
    }
}
