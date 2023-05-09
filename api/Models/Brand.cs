namespace api.Models
{
    public class Brand
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public int Year { get; set; }
        public string Logo { get; set; } = string.Empty;

        public ICollection<Cigarette> Cigarettes { get; set; } = new List<Cigarette>();
    }
}