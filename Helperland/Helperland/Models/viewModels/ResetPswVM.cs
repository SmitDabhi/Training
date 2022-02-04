using System.ComponentModel.DataAnnotations;

namespace Helperland.Models.viewModels
{
    public class ResetPswVM
    {
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}
