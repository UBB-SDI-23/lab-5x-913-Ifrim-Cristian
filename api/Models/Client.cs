using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class Client : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty!;
        public string SecondName { get; set; } = string.Empty!;
        public DateTime DateOfBirth { get; set; } = default!;
        public string Address { get; set; } = string.Empty;
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}