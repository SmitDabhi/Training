using System.ComponentModel.DataAnnotations;

namespace Helperland.Models.viewModels
{
    public class GetAddressVM
    {
        [Required]
        public int Id { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public string? Mobile { get; set; }
        public string? Email { get; set; }
        public bool IsDefault { get; set; }
    }
}
