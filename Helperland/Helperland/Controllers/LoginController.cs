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
        public IActionResult SignUp(bool IsCSExist = false)
        {
            ViewBag.IsCSExist = IsCSExist;
            return View();
        }
        

        [Route("userRegistration")]
        [ValidateAntiForgeryToken]
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
                if (_dbcontext.Users.Any(x => x.Email == req.Email) || _dbcontext.Users.Any(x => x.Mobile == req.Mobile))
                {
                    return RedirectToAction("SignUp", "Login",new { IsCSExist = "true" });
                }
                else
                {
                    _dbcontext.Users.Add(req);
                    _dbcontext.SaveChanges();
                    return RedirectToAction("Index", "Home", new { login = "true" });
                }
            }
            return View();
        }

        [Route("becomeProvider")]
        public IActionResult BecomePro(bool IsSPExist = false)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid == null)
            {
                ViewBag.IsSPExist = IsSPExist;
                return View();
            }
            return RedirectToAction("Index", "Home");
            
        } 
        
        [Route("becomeProvider")]
        [ValidateAntiForgeryToken]
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

                if (_dbcontext.Users.Any(x => x.Email == req.Email) || _dbcontext.Users.Any(x => x.Mobile == req.Mobile))
                {
                    return RedirectToAction("BecomePro", "Login", new { IsSPExist = "true"});
                }
                else
                {
                    _dbcontext.Users.Add(req);
                    _dbcontext.SaveChanges();
                    return RedirectToAction("Index", "Home", new { login = "true" });
                }
            }
            return View();
        }

        [HttpPost]
        public IActionResult AuthLogin(AuthVM auth)
        {
            if (ModelState.IsValid)
            {
                var req = _dbcontext.Users.Where(x => x.Email == auth.Username &&  x.Password == auth.Password).FirstOrDefault();

                if (req != null)
                {
                    if (req.UserTypeId == 1)
                    {
                        HttpContext.Session.SetInt32("userid", req.UserId);
                        return RedirectToAction("Servicerequest", "Customer");
                    }else if(req.UserTypeId == 2)
                    {
                        HttpContext.Session.SetInt32("userid", req.UserId);
                        return RedirectToAction("Servicerequest", "Customer");
                    }
                }
                else
                {
                    TempData["showClass"] = "alert show";
                    TempData["errorMsg"] = "Invalid Username or Password!";
                    return RedirectToAction("Index", "Home", new { login = "true" });
                }
            }
            TempData["showClass"] = "alert show";
            TempData["errorMsg"] = "Please enter Email and Password";
            return RedirectToAction("Index", "Home", new { login = "true" });
        }

        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home");
        }
    }
}
