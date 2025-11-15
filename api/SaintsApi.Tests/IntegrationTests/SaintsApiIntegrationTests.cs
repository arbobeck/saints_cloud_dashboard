using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using SaintsApi.Data;
using SaintsApi.Models;

namespace SaintsApi.Tests.IntegrationTests;

public class SaintsApiIntegrationTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

    public SaintsApiIntegrationTests(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetSaints_ReturnsSuccessStatusCode()
    {
        // Act
        var response = await _client.GetAsync("/api/saints");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task GetSaints_ReturnsJsonArray()
    {
        // Act
        var saints = await _client.GetFromJsonAsync<List<Saint>>("/api/saints");

        // Assert
        saints.Should().NotBeNull();
        saints.Should().HaveCountGreaterThanOrEqualTo(1);
    }

    [Fact]
    public async Task GetHistory_ReturnsSuccessStatusCode()
    {
        // Act
        var response = await _client.GetAsync("/api/history");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task GetSaintById_InvalidId_ReturnsNotFound()
    {
        // Act
        var response = await _client.GetAsync("/api/saints/99999");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}

// Custom factory to replace the real database with in-memory
public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Remove the real DbContext registration
            services.RemoveAll(typeof(DbContextOptions<SaintsDbContext>));

            // Add in-memory database
            services.AddDbContext<SaintsDbContext>(options =>
            {
                options.UseInMemoryDatabase("TestDb");
            });

            // Build the service provider and seed test data
            var sp = services.BuildServiceProvider();
            using var scope = sp.CreateScope();
            var scopedServices = scope.ServiceProvider;
            var db = scopedServices.GetRequiredService<SaintsDbContext>();

            db.Database.EnsureCreated();

            // Seed test data
            if (!db.Saints.Any())
            {
                db.Saints.AddRange(
                    new Saint 
                    { 
                        Name = "Test Saint", 
                        FeastDay = new DateTime(2025, 10, 4), 
                        Patronages = "Testing" 
                    }
                );
                db.SaveChanges();
            }

            if (!db.History.Any())
            {
                db.History.AddRange(
                    new History { Name = "Test Event", Year = 2025 }
                );
                db.SaveChanges();
            }
        });
    }
}