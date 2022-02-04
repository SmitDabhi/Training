using System.ComponentModel.DataAnnotations;

namespace Helperland.Models.viewModels
{
    public class AuthVM
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public bool Remember { get; set; }
    }
}
