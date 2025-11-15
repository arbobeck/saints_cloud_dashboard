using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using SaintsApi.Data;
using SaintsApi.Models;

namespace SaintsApi.Tests.UnitTests;

public class SaintsEndpointsTests
{
    [Fact]
    public async Task GetSaints_ReturnsAllSaints()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<SaintsDbContext>()
            .UseInMemoryDatabase(databaseName: "TestSaintsDb")
            .Options;

        using var context = new SaintsDbContext(options);
        
        context.Saints.AddRange(
            new Saint { Name = "St. Francis", FeastDay = new DateTime(2025, 10, 4), Patronages = "Animals" },
            new Saint { Name = "St. Augustine", FeastDay = new DateTime(2025, 8, 28), Patronages = "Theologians" }
        );
        await context.SaveChangesAsync();

        // Act
        var saints = await context.Saints.ToListAsync();

        // Assert
        saints.Should().HaveCount(2);
        saints.Should().Contain(s => s.Name == "St. Francis");
    }

    [Fact]
    public async Task GetSaintById_ExistingId_ReturnsSaint()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<SaintsDbContext>()
            .UseInMemoryDatabase(databaseName: "TestSaintsDbById")
            .Options;

        using var context = new SaintsDbContext(options);
        
        var saint = new Saint 
        { 
            Name = "St. Patrick", 
            FeastDay = new DateTime(2025, 3, 17), 
            Patronages = "Ireland" 
        };
        context.Saints.Add(saint);
        await context.SaveChangesAsync();

        // Act
        var result = await context.Saints.FindAsync(saint.Id);

        // Assert
        result.Should().NotBeNull();
        result!.Name.Should().Be("St. Patrick");
    }

    [Fact]
    public async Task GetSaintById_NonExistingId_ReturnsNull()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<SaintsDbContext>()
            .UseInMemoryDatabase(databaseName: "TestSaintsDbNotFound")
            .Options;

        using var context = new SaintsDbContext(options);

        // Act
        var result = await context.Saints.FindAsync(999);

        // Assert
        result.Should().BeNull();
    }
}