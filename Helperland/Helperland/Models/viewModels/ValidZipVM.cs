using System.ComponentModel.DataAnnotations;

namespace Helperland.Models.viewModels
{
    public class ValidZipVM
    {
        [Required]
        [StringLength(6, MinimumLength =6)]
        [RegularExpression(@"^([0-9]{6})$")]
        public string PostalCode { get; set; }

    }
}
