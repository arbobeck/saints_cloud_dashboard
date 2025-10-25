using SaintsApi.Models;
using SaintsApi.Services;

var builder = WebApplication.CreateBuilder(args);
 
builder.Services.AddSingleton<SaintService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("api/saints", (SaintService svc) => svc.GetAll());
app.MapGet("api/saints/{id:int}", (int id, SaintService svc) =>
    svc.GetById(id) is { } saint ? Results.Ok(saint) : Results.NotFound());

app.Run();