namespace Helperland.Models.viewModels
{
    public class GetServiceReqDataVM
    {
        public int? ServiceId { get; set; }
        public string? ServiceDate { get; set; }
        public string? ServiceStartTime { get; set; }
        public string? ServiceEndTime { get; set; }
        public decimal? TotalCost { get; set; }
        public int? SpID { get; set; }
        public string? SpName { get; set; }
        public decimal? SpRatings { get; set; }
        public string? SpAvtar { get; set; }
        public int? Status { get; set; }
    }
}
