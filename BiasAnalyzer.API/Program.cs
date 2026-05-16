using BiasAnalyzer.Data;
using BiasAnalyzer.Data.Repositories;
using BiasAnalyzer.Data.Seed;
using BiasAnalyzer.Core.Interfaces;
using BiasAnalyzer.Core.Models;
using BiasAnalyzer.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddHttpClient<UrlScraperService>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddSingleton<List<GaucherWord>>(GaucherSeedData.GetWords());

builder.Services.AddScoped<IAnalysisRepository, AnalysisRepository>();
builder.Services.AddScoped<GaucherAnalysisService>();
builder.Services.AddScoped<ClaudeAnalysisService>(_ =>
    new ClaudeAnalysisService(builder.Configuration["Claude:ApiKey"] ?? ""));
builder.Services.AddScoped<BiasAnalysisOrchestrator>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
        policy.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod());
                
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
    app.MapOpenApi();

app.UseCors("AllowReact");
app.UseHttpsRedirection();
app.MapControllers();
app.Run();