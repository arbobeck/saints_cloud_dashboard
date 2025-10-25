using SaintsApi.Models;

namespace SaintsApi.Services;

public class SaintService
{
    private readonly List<Saint> _saints = new()
    {
        new() { Id = 1, Name = "St. Francis of Assisi", FeastDay = new DateOnly(2025, 10, 4), Patronages = new List<string>{"Animals", "Ecology"} },
        new() { Id = 2, Name = "St. Augustine", FeastDay = new DateOnly(2025, 8, 28), Patronages = new List<string>{"Theologians"} },
        new() { Id = 3, Name = "St. Teresa of Avila", FeastDay = new DateOnly(2025, 10, 15), Patronages = new List<string>{"Writers", "Mystics"} },
        new() { Id = 4, Name = "St. Daria & St. Chrysanthus", FeastDay = new DateOnly (2025, 10, 25), Patronages = new List<string>{"Judges"} }
    };
    
    public IEnumerable<Saint> GetAll() => _saints;
    public Saint? GetById(int id) => _saints.FirstOrDefault(s => s.Id == id);
}