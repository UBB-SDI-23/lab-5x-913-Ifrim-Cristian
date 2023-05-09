using api.Validations;

namespace api.DTOs
{
    public class AddCigaretteDto
    {
        public int BrandId { get; set; }
        public string Model { get; set; } = string.Empty;
        [TypeCheck]
        public string Type { get; set; } = string.Empty;
        public bool IsHeated { get; set; } = false;
        [QuantityCheck(0)]
        public int NicotineQuantity { get; set; }
        [PriceCheck(15)]
        public float Price { get; set; }
    }
}