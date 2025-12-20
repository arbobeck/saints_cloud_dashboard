using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using SaintsApi.Data;
using SaintsApi.Models;
using SaintsApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<SaintsDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("SaintsDb"),
        npgsqlOptions => npgsqlOptions.EnableRetryOnFailure(
            maxRetryCount: 10, 
            maxRetryDelay: TimeSpan.FromSeconds(5), 
            errorCodesToAdd: null
        )
    )
);

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IBlogService, BlogService>();

// JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"] ?? "YourSuperSecretKeyHere_ChangeThis_MinimumLength32Characters!";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "ByzanticaApi",
            ValidAudience = builder.Configuration["Jwt:Audience"] ?? "ByzanticaApp",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins(
            "http://localhost:4200",
            "https://byzantica.org",
            "https://www.byzantica.org",
            "https://byzantica.netlify.app",
            "http://byzantica.org",
            "http://www.byzantica.org",
            "http://byzantica.netlify.app"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAngular");
app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.MapGet("/api/saints", async (SaintsDbContext db) =>
{
    try
    {
        return Results.Ok(await db.Saints.ToListAsync());
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error retrieving saints: {ex.Message}");
    }
});

app.MapGet("/api/saints/{id:int}", async (int id, SaintsDbContext db) =>
{
    if (id <= 0)
        return Results.BadRequest("ID must be greater than 0");

    try
    {
        var saint = await db.Saints.FindAsync(id);
        return saint is not null ? Results.Ok(saint) : Results.NotFound();
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error retrieving saint: {ex.Message}");
    }
});

app.MapPost("/api/saints", async (Saint saint, SaintsDbContext db) =>
{
    if (string.IsNullOrWhiteSpace(saint.Name))
        return Results.BadRequest("Name is required");

    if (saint.FeastDay == default)
        return Results.BadRequest("Feast day is required");

    try
    {
        db.Saints.Add(saint);
        await db.SaveChangesAsync();
        return Results.Created($"/api/saints/{saint.Id}", saint);
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error creating saint: {ex.Message}");
    }
});

app.MapGet("/api/history", async (SaintsDbContext db) =>
{
    try
    {
        return Results.Ok(await db.History.ToListAsync());
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error retrieving history: {ex.Message}");
    }
});

app.MapGet("/api/history/{id:int}", async (int id, SaintsDbContext db) =>
{
    if (id <= 0)
        return Results.BadRequest("ID must be greater than 0");

    try
    {
        var history = await db.History.FindAsync(id);
        return history is not null ? Results.Ok(history) : Results.NotFound();
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error retrieving history: {ex.Message}");
    }
});

app.Run();

public partial class Program { }
