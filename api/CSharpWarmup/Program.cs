using System.Text.Json;

var saints = new[]
{
    new { Name = "St. Francis of Assisi", FeastDay = "October 4" },
    new { Name = "St. Augustine", FeastDay = "August 28" },
    new { Name = "St. Teresa of Avila", FeastDay = "October 15" }
};

var json = JsonSerializer.Serialize(saints, new JsonSerializerOptions { WriteIndented = true });
Console.WriteLine(json);
