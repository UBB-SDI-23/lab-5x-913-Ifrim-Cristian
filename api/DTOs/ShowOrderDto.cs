namespace api.DTOs
{
    public class ShowOrderDto
    {
        public int OrderId { get; set; }
        public int Quantity { get; set; }
        public DateTime OrderDate { get; set; }
        public AddCigaretteDto Cigarette { get; set; } = default!;
    }
}