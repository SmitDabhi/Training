using Helperland.Data;
using Helperland.Models;
using Helperland.Models.viewModels;
using Microsoft.AspNetCore.Mvc;

namespace Helperland.Controllers
{
    public class LoginController : Controller
    {
        private readonly HelperlandDBContext _dbcontext;

        public LoginController(HelperlandDBContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [Route("userRegistration")]
        public IActionResult SignUp()
        {
            return View();
        }
        

        [Route("userRegistration")]
        [HttpPost]
        public IActionResult SignUp(UserRegVM userModel)
        {
            if (ModelState.IsValid)
            {
                var req = new User()
                {
                    FirstName = userModel.Firstname,
                    LastName = userModel.Lastname,
                    Email = userModel.Email,
                    Password = userModel.Password,
                    Mobile = userModel.PhoneNumber,
                    UserTypeId = 1,
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now,
                };
                _dbcontext.Users.Add(req);
                _dbcontext.SaveChanges();
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        [Route("becomeProvider")]
        public IActionResult BecomePro()
        {
            return View();
        } 
        
        [Route("becomeProvider")]
        [HttpPost]
        public IActionResult BecomePro(UserRegVM spModel)
        {
            if (ModelState.IsValid)
            {
                var req = new User()
                {
                    FirstName = spModel.Firstname,
                    LastName = spModel.Lastname,
                    Email = spModel.Email,
                    Password = spModel.Password,
                    Mobile = spModel.PhoneNumber,
                    UserTypeId = 2,
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now,
                };
                _dbcontext.Users.Add(req);
                _dbcontext.SaveChanges();
                return RedirectToAction("Index", "Home");
            }
            return View();
        }
    }
}
