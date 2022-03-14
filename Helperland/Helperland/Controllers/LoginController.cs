using Helperland.Data;
using Helperland.Models;
using Helperland.Models.viewModels;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace Helperland.Controllers
{
    public class LoginController : Controller
    {
        private readonly HelperlandDBContext _dbcontext;
        private readonly IConfiguration _config;
        public LoginController(HelperlandDBContext dbcontext, IConfiguration config)
        {
            _dbcontext = dbcontext;
            _config = config;
        }

        [Route("userRegistration")]
        public IActionResult SignUp(bool IsCSExist = false)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid == null)
            {
                ViewBag.IsCSExist = IsCSExist;
                ViewBag.UType = 1;
                return View();
            }
            return RedirectToAction("Index", "Home");
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
                    Password = BCrypt.Net.BCrypt.HashPassword(userModel.Password),
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
                ViewBag.UType = 1;
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
                    Password = BCrypt.Net.BCrypt.HashPassword(spModel.Password),
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

        [ValidateAntiForgeryToken]
        [HttpPost]
        public IActionResult AuthLogin(AuthVM auth)
        {
            if (ModelState.IsValid)
            {
                

                var req = _dbcontext.Users.Where(x => x.Email == auth.Username).FirstOrDefault();

                if (req != null)
                {
                    if(BCrypt.Net.BCrypt.Verify(auth.Password, req.Password)) 
                    { 
                        if (req.UserTypeId == 1)
                        {
                            HttpContext.Session.SetInt32("userid", req.UserId);
                            return RedirectToAction("Dashboard", "Customer");
                        }else if(req.UserTypeId == 2)
                        {
                            HttpContext.Session.SetInt32("userid", req.UserId);
                            return RedirectToAction("Dashboard", "Serviceprovider");
                        }else if(req.UserTypeId == 3)
                        {
                            HttpContext.Session.SetInt32("userid", req.UserId);
                            return RedirectToAction("Servicerequest", "Admin");
                        }
                    }
                    else
                    {
                        TempData["showClass"] = "alert show";
                        TempData["errorMsg"] = "Invalid Username or Password!";
                        return RedirectToAction("Index", "Home", new { login = "true" });
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
            return RedirectToAction("Index", "Home", new { logout = "true" });
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public IActionResult Forgot(AuthVM forgotEmail)
        {
            if (ModelState.IsValid)
            {
                if(_dbcontext.Users.Any(x => x.Email == forgotEmail.Username))
                {
                    User req = _dbcontext.Users.FirstOrDefault(x => x.Email == forgotEmail.Username);
                    string To = forgotEmail.Username;
                    int Uid = req.UserId;
                    string Subject = "Reset Password";
                    string Hash = BCrypt.Net.BCrypt.HashPassword(req.Password);
                    string Body = "<h2 style='text-align: center; background-color: #1D7A8C; color: white; padding: 10px 0; font-family: sans-serif;' > Helperland | Home Services </h2>" + "<span style='margin: 5px 0; color: #646464; font-size: 16px; font-family: sans-serif;'> Hello "+ req.FirstName +" <br> Click the link below to reset your account password. <br>" + "<a href='" + Url.Action("ResetPassword", "Login", new { id = Uid, code = Hash }, "https") + "' style ='text-decoration: none; cursor: pointer; color: #1D7A8C; font-size: 16px; font-family: sans-serif; font-weight:bold'>Reset Password <br></a></span>";
                    MailMessage msg = new MailMessage();
                    msg.Body = Body;
                    msg.To.Add(To);
                    msg.Subject = Subject;
                    msg.From = new MailAddress("sm.project.workstation@gmail.com", "Helperland");
                    msg.IsBodyHtml = true;

                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = "smtp.gmail.com";
                    smtp.Port = 587;
                    smtp.EnableSsl = true;
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;

                    System.Net.NetworkCredential credential = new System.Net.NetworkCredential();
                   
                    credential.UserName = _config.GetSection("MailProfile").GetSection("UserName").Value;
                    credential.Password = _config.GetSection("MailProfile").GetSection("Password").Value;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = credential;
                    smtp.Send(msg);

                    
                    TempData["showClass"] = "alert alert-success show";
                    TempData["errorMsg"] = "Reset password link send to your registered Email Address!";
                    return RedirectToAction("Index", "Home", new { forgot = "true" });
                }
                else
                {
                    TempData["showClass"] = "alert alert-danger show";
                    TempData["errorMsg"] = "Email not registered!";
                    return RedirectToAction("Index", "Home", new { forgot = "true" });
                }
            }
            TempData["showClass"] = "alert alert-danger show";
            TempData["errorMsg"] = "Please enter Email!";
            return RedirectToAction("Index","Home", new { forgot = "true" });
        }

        public IActionResult ResetPassword(int id,string code)
        {
            var req = _dbcontext.Users.FirstOrDefault(x => x.UserId == id);
            var encpsw = req.Password;
            if (BCrypt.Net.BCrypt.Verify(encpsw, code))
            {
                ViewBag.Page = "ResetPsw";
                return View();
            }
            return RedirectToAction("Index", "Home");
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public IActionResult ResetPassword(ResetPswVM model,int id)
        {
            User req = _dbcontext.Users.FirstOrDefault(x => x.UserId == id);
            req.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);
            req.ModifiedDate = DateTime.Now;
            _dbcontext.Users.Update(req);
            _dbcontext.SaveChanges();
            return RedirectToAction("Index", "Home", new { reset = "true" });
        }
    }
}
