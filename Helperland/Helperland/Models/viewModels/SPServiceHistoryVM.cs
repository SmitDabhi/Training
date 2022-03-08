namespace Helperland.Models.viewModels
{
    public class SPServiceHistoryVM
    {
        public int ServiceId { get; set; }
        public string? ServiceDate { get; set; }
        public string? ServiceStartTime { get; set; }
        public string? ServiceEndTime { get; set; }
        public string? CustName { get; set; }
        public string? AddLine1 { get; set; }
        public string? AddLine2 { get; set; }
        public string? PostalCode { get; set; }
        public string? City { get; set; }
        public decimal? Payment { get; set; }
        public bool? HasPet { get; set; }
    }
}
