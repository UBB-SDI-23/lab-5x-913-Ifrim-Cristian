namespace api.DTOs
{
    public class ShowCigaretteDto
    {
        public int Id { get; set; }
        public string Model { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int NicotineQuantity { get; set; }
        public float Price { get; set; }
        public bool IsHeated { get; set; }
        public AddBrandDto Brand { get; set; } = default!;       
    }
}