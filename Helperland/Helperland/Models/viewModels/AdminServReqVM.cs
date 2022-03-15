namespace Helperland.Models.viewModels
{
    public class AdminServReqVM
    {
        public int Id { get; set; }
        public string? ServiceDate { get; set; }
        public string? ServiceStartTime { get; set; }
        public string? ServiceEndTime { get; set; }
        public string? CustName { get; set; }
        public string? AddLine1 { get; set; }
        public string? AddLine2 { get; set; }
        public string? PostalCode { get; set; }
        public string? City { get; set; }
        public string? Email { get; set; }
        public string? ProfIcon { get; set; }
        public string? SPName { get; set; }
        public decimal Rating { get; set; }
        public decimal? Payment { get; set; }
        public string? Status { get; set; }
    }
}
