namespace api.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty!;
        public string Address { get; set; } = string.Empty!;
        public string Email { get; set; } = string.Empty!;
        public int YearOfCreation { get; set; }

        public string ClientId { get; set; } = string.Empty!;
        public Client Client { get; set; } = default!;
    }
}