namespace SaintsApi.Models;

public class Saint
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public DateOnly FeastDay { get; set; }
    public List<string> Patronages { get; set; } = new();
}