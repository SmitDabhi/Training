using Helperland.Data;
using Helperland.Models;
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
        public IActionResult SignUp(User userModel)
        {
            userModel.UserTypeId = 1;
            userModel.CreatedDate = DateTime.Now;
            userModel.ModifiedDate = DateTime.Now;
            _dbcontext.Users.Add(userModel);
            _dbcontext.SaveChanges();
            return RedirectToAction("Index","Home");
        }
    }
}
