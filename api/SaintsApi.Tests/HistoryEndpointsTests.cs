using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using SaintsApi.Data;
using SaintsApi.Models;

namespace SaintsApi.Tests.UnitTests;

public class HistoryEndpointsTests
{
    [Fact]
    public async Task GetHistory_ReturnsAllHistoryEvents()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<SaintsDbContext>()
            .UseInMemoryDatabase(databaseName: "TestHistoryDb")
            .Options;

        using var context = new SaintsDbContext(options);
        
        context.History.AddRange(
            new History { Name = "Council of Nicaea", Year = 325 },
            new History { Name = "Great Schism", Year = 1054 }
        );
        await context.SaveChangesAsync();

        // Act
        var history = await context.History.ToListAsync();

        // Assert
        history.Should().HaveCount(2);
        history.Should().Contain(h => h.Year == 325);
    }

    [Theory]
    [InlineData(325)]
    [InlineData(1054)]
    [InlineData(1517)]
    public void ValidYear_ShouldBePositive(int year)
    {
        // Assert
        year.Should().BePositive();
    }
}