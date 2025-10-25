using SaintsApi.Models;

namespace SaintsApi.Services;

public class HistoryService
{
    private readonly List<History> _history = new()
    {
    new() {Id = 1, Name = "Pentecost", Year = 33},
    new() {Id = 2, Name = "Filioque added by Third Council of Toledo", Year = 589},
    new() {Id = 3, Name = "Great Schism", Year = 1054}
    };

    public IEnumerable<History> GetAll() => _history;
    public History? GetById(int id) => _history.FirstOrDefault(s => s.Id == id);
}