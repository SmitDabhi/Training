namespace Helperland.Models.viewModels
{
    public class ServiceReqSumVM
    {
        public int ServiceId { get; set; }
        public string? ServiceDateTime { get; set; }
        public decimal? Duration { get; set; }
        public decimal NetPay { get; set; }
        public bool Pets { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Comment { get; set; }
        public bool Cabinet { get; set; }
        public bool Fridge { get; set; }
        public bool Oven { get; set; }
        public bool Window { get; set; }
        public bool Wash { get; set; }
    }
}
