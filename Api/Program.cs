using Api.Configurations;
using Api.Filters;
using Application.AppConfig;
using AutoWrapper;
using Domain.Constants;
using Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

//Add service to DI container
{
    var services = builder.Services;
    services.Configure<AppSettings>(configuration.GetSection(nameof(AppSettings)));
    services.Configure<ApiBehaviorOptions>(options =>
    {
        options.SuppressModelStateInvalidFilter = true;
    });
    services.AddDbService();
    services.AddRepositories();
    services.AddFirebase();
    services.AddAppServices();
    services.AddAutoMapper(Assembly.GetExecutingAssembly());
    services.AddOData();
    services.AddFilters();



    services.AddJwtService();
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

        var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        option.IncludeXmlComments(xmlPath);
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
        await app.Services.DbInitializer();
    }
    app.UseApiResponseAndExceptionWrapper(new AutoWrapperOptions { IsApiOnly = false, ShowIsErrorFlagForSuccessfulResponse = true, WrapWhenApiPathStartsWith = "/server"});
    app.UseRouting();

    app.UseAuthentication();
    app.UseAuthorization();
    app.AddControllerMapper();

    var ENV_PORT = Environment.GetEnvironmentVariable("PORT");
    if (ENV_PORT is not null) app.Urls.Add($"http://0.0.0.0:{ENV_PORT}");

    app.Run();
}

