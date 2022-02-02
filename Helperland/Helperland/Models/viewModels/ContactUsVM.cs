using System.ComponentModel.DataAnnotations;

namespace Helperland.Models.viewModels
{
    public class ContactUsVM
    {
        [Required(ErrorMessage = "Please enter first name")]
        public string Firstname { get; set; } = null!;

        [Required(ErrorMessage = "Please enter last name")]
        public string Lastname { get; set; } = null!;

        [Required(ErrorMessage ="Please enter email")]
        [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessage = "Enter valid Email")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage ="Select subject")]
        public string Subject { get; set; } = null!;

        [Required(ErrorMessage ="Please enter mobile number")]
        [StringLength(10, MinimumLength = 10,ErrorMessage ="Enter valid mobile number")]
        [RegularExpression(@"^([0-9]{10})$", ErrorMessage = "Enter valid mobile number")]
        public string PhoneNumber { get; set; } = null!;

        public string? Message { get; set; }
        public IFormFile? UploadFile { get; set; }

        public string? UploadPath { get; set; }
    }
}
