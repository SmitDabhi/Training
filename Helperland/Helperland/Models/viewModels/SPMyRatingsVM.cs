namespace Helperland.Models.viewModels
{
    public class SPMyRatingsVM
    {
        public int ServiceId { get; set; }
        public string? CustomerName { get; set; }
        public string? ServiceDate { get; set; }
        public string? ServiceStartTime { get; set; }
        public string? ServiceEndTime { get; set; }
        public decimal Rating { get; set; }
        public string? RatingTitle{ get; set; }
        public string? Comment{ get; set; }
    }
}
