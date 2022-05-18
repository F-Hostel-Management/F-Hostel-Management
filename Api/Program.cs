using System.Reflection;
using Persistence.Configurations;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
//Add service to DI container
{
    builder.Services.AddDbService(configuration);
    builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
    builder.Services.AddControllers(
        options =>
        {
            options.SuppressAsyncSuffixInActionNames = false;
        }
    );
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
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

