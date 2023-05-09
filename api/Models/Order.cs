namespace api.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int Quantity { get; set; }
        public DateTime OrderDate { get; set; }

        public Client Client { get; set; } = default!;
        public int ClientId { get; set; }
        
        public Cigarette Cigarette { get; set; } = default!;
        public int CigaretteId { get; set; }
    }
}