using System.ComponentModel.DataAnnotations;

namespace Helperland.Models.viewModels
{
    public class ResetPswVM
    {
        public string? Password { get; set; }

        public string? ConfirmPassword { get; set; }
    }
}
