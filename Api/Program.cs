using System.Configuration;
using System.Reflection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Configurations;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
//Add service to DI container
{
    var services = builder.Services;
    services.Configure<AppSettings>(configuration.GetSection(nameof(AppSettings)));
    services.AddDbService();
    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options => { 
        });
    services.AddAutoMapper(Assembly.GetExecutingAssembly());
    services.AddControllers(
        options =>
        {
            options.SuppressAsyncSuffixInActionNames = false;
        }
    );
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();
}

var app = builder.Build();
// Add service to Http request pipeline
{
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseDeveloperExceptionPage();
        await app.Services.ApplyMigrations();
    }
    app.UseAuthorization();
    app.MapControllers();
    app.Run();
}

