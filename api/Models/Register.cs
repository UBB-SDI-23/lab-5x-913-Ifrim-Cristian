using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Register
    {  
        [Required(ErrorMessage = "User Name is required")]  
        public string Username { get; set; } = string.Empty;
  
        [EmailAddress]  
        [Required(ErrorMessage = "Email is required")]  
        public string Email { get; set; }  = string.Empty;
  
        [Required(ErrorMessage = "Password is required")]  
        public string Password { get; set; }  = string.Empty;
  
    } 
}