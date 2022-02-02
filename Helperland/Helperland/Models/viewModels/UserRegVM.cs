using System.ComponentModel.DataAnnotations;

namespace Helperland.Models.viewModels
{
    public class UserRegVM
    {
        [Required(ErrorMessage = "Please enter first name")]
        public string Firstname { get; set; } = null!;

        [Required(ErrorMessage = "Please enter last name")]
        public string Lastname { get; set; } = null!;

        [Required(ErrorMessage = "Please enter email")]
        [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessage = "Enter valid Email")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Please enter mobile number")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Enter valid mobile number")]
        [RegularExpression(@"^([0-9]{10})$", ErrorMessage = "Enter valid mobile number")]
        public string PhoneNumber { get; set; } = null!;

        [Required(ErrorMessage ="Please enter password")]
        [StringLength(100, ErrorMessage = "Password \"{0}\" must have {2} character", MinimumLength = 8)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$", ErrorMessage = "Password must contain: Minimum 8 characters atleast 1 UpperCase Alphabet, 1 LowerCase Alphabet, 1 Number and 1 Special Character")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Please enter confirm password")]
        [Compare("Password", ErrorMessage = "Confirm password doesn't match, Type again !")]
        [DataType(DataType.Password)]
        public string Confirmpwd { get; set; }
    }
}
