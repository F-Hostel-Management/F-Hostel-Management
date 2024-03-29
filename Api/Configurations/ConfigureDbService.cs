﻿using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Infrastructure.Contexts;
using Persistence.Repositories;
using Application.Interfaces.IRepository;
using Api.Configurations.DabaseInittials;
using Application.AppConfig;

namespace Api.Configurations;

public static class ConfigureDbService
{
    public static void AddDbService(this IServiceCollection services)
    {
        var settings = services.BuildServiceProvider().GetService<IOptions<AppSettings>>();
        Console.WriteLine(settings);
        services.AddDbContext<ApplicationDbContext>(
            options =>
                options.UseSqlServer(
                    settings.Value.ConnectionStrings.DefaultConnection
                )
        );
        services.AddScoped<IApplicationDbContext>(
            provider => provider.GetService<ApplicationDbContext>()
        );
    }

    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
    }
    public static async Task DbInitializer(this IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        await using ApplicationDbContext dbContext =
            scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        await DatabaseInitializer.InitializeAsync(dbContext);
    }

    public static async Task ApplyMigrations(this IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        await using ApplicationDbContext dbContext =
            scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        await dbContext.Database.MigrateAsync();
    }
}
