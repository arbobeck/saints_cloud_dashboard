using Microsoft.EntityFrameworkCore;
using SaintsApi.Data;
using SaintsApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<SaintsDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/api/saints", async (SaintsDbContext db) => await db.Saints.ToListAsync());
app.MapGet("/api/saints/{id:int}", async (int id, SaintsDbContext db) =>
    await db.Saints.FindAsync(id) is { } saint ? Results.Ok(saint) : Results.NotFound());

app.MapGet("/api/history", async (SaintsDbContext db) => await db.History.ToListAsync());
app.MapGet("/api/history/{id:int}", async (int id, SaintsDbContext db) =>
    await db.History.FindAsync(id) is { } history ? Results.Ok(history) : Results.NotFound());
    
app.Run();
