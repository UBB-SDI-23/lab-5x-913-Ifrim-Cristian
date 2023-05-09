namespace api.DTOs
{
    public class BrandStatisticDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public int Year { get; set; }
        public string Logo { get; set; } = string.Empty;
        public float AverageNicotine { get; set; }
        public ICollection<AddCigaretteDto> Cigarettes { get; set; } = new List<AddCigaretteDto>();
    }
}