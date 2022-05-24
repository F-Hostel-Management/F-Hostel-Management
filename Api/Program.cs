using System.Reflection;
using Api.Services;
using Microsoft.OpenApi.Models;
using Domain.Constants;
using System.Security.Claims;
using Domain.Enums;
using Api.App.Configurations;
using Api.Configurations;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

//Add service to DI container
{
    var services = builder.Services;
    services.Configure<AppSettings>(configuration.GetSection(nameof(AppSettings)));
    services.AddDbService();
    services.AddRepositories();
    services.AddFirebase();
    services.AddAppServices();
    services.AddAutoMapper(Assembly.GetExecutingAssembly());
    services.AddControllers(
        options =>
        {
            options.SuppressAsyncSuffixInActionNames = false;
        }
    );
    services.AddAuthorization(options =>
    {
        options.AddPolicy(PolicyName.ONWER_AND_MANAGER,
        policyBuilder => policyBuilder.RequireClaim(ClaimTypes.Role, nameof(Role.Owner), nameof(Role.Manager)));
    });
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen(option =>
    {
        option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
        {
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
        });
        option.AddSecurityRequirement(new OpenApiSecurityRequirement
 {
     {
           new OpenApiSecurityScheme
             {
                 Reference = new OpenApiReference
                 {
                     Type = ReferenceType.SecurityScheme,
                     Id = "Bearer"
                 }
             },
             new string[] {}
     }
 });
    });
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
    app.UseRouting();
    app.UseAuthentication();
    app.UseAuthorization();
    app.AddControllerMapper();

    var ENV_PORT = Environment.GetEnvironmentVariable("PORT");
    if (ENV_PORT is not null) app.Urls.Add($"http://0.0.0.0:{ENV_PORT}");

    app.Run();
}

