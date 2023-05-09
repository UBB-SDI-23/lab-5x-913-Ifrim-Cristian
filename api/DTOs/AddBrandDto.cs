using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class AddBrandDto
    {
        public int BrandId { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public string Country { get; set; } = string.Empty;
        [Required]
        public int Year { get; set; }
        [Required]
        public string Logo { get; set; } = string.Empty;
    }
}