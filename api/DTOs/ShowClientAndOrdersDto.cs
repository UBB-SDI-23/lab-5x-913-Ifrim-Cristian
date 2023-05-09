namespace api.DTOs
{
    public class ShowClientAndOrdersDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty!;
        public string SecondName { get; set; } = string.Empty!;
        public DateTime DateOfBirth { get; set; } = default!;
        public string Email { get; set; } = string.Empty;
        public ICollection<ShowOrderDto> Orders { get; set; } = new List<ShowOrderDto>();
    }
}