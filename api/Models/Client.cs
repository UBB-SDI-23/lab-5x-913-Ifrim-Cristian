using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Client
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty!;
        public string SecondName { get; set; } = string.Empty!;
        public DateTime DateOfBirth { get; set; } = default!;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}