using System.ComponentModel.DataAnnotations;

namespace Helperland.Models.viewModels
{
    public class PassChangeVM
    {
        [Required]
        public string OldPassword { get; set; }
        
        [Required]
        [StringLength(100, MinimumLength = 8)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$")]
        public string NewPassword { get; set; }

        [Required]
        public string ConfirmPassword { get; set; } 
    }
}
