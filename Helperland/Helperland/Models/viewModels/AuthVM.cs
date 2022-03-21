using System.ComponentModel.DataAnnotations;

namespace Helperland.Models.viewModels
{
    public class AuthVM
    {
        [Required]
        public string Username { get; set; }

        [DataType(DataType.Password)]
        public string? Password { get; set; }

    }
}
