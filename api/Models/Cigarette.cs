using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Cigarette
    {
        [Key]
        public int Id { get; set; }
        public string Model { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int NicotineQuantity { get; set; }
        public float Price { get; set; }
        public bool IsHeated { get; set; } = false;
        public int BrandId { get; set; }
        public Brand Brand { get; set; } = null!;
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }   
}