using Helperland.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Helperland.Models.viewModels;
using Helperland.Data;
using System.Net.Mail;

namespace Helperland.Controllers
{
    public class HomeController : Controller
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly HelperlandDBContext _dbcontext;
        private readonly IConfiguration _config;

        public HomeController(HelperlandDBContext dbcontext, IWebHostEnvironment webHostEnvironment, IConfiguration config)
        {
            _webHostEnvironment = webHostEnvironment;
            _dbcontext = dbcontext;
            _config = config;
        }

        public IActionResult Index()
        {
            int?  Uid = HttpContext.Session.GetInt32("userid");
            if(Uid != null)
            {
                var req = _dbcontext.Users.Where(x => x.UserId == Uid).FirstOrDefault();
                ViewBag.IsloggedIn = "success";
                ViewBag.Uname = req.FirstName;
                ViewBag.UType = req.UserTypeId;
            }
            else
            {
                ViewBag.UType = 1;
            }
            return View();
        }

        [Route("price")]
        public IActionResult Price()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                var req = _dbcontext.Users.Where(x => x.UserId == Uid).FirstOrDefault();
                ViewBag.IsloggedIn = "success";
                ViewBag.Uname = req.FirstName;
                ViewBag.UType = req.UserTypeId;
            }
            else
            {
                ViewBag.UType = 1;
            }
            return View();
        }
        
        [Route("faq")]
        public IActionResult Faq()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                var req = _dbcontext.Users.Where(x => x.UserId == Uid).FirstOrDefault();
                ViewBag.IsloggedIn = "success";
                ViewBag.Uname = req.FirstName;
                ViewBag.UType = req.UserTypeId;
            }
            else
            {
                ViewBag.UType = 1;
            }
            return View();
        }

        [Route("contact")]
        public IActionResult Contact(bool IsSubmit=false)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                var req = _dbcontext.Users.Where(x => x.UserId == Uid).FirstOrDefault();
                ViewBag.IsloggedIn = "success";
                ViewBag.Uname = req.FirstName;
                ViewBag.UType = req.UserTypeId;
            }
            else
            {
                ViewBag.UType = 1;
            }
            ViewBag.IsSubmit = IsSubmit;
            return View();
        }

        [Route("contact")]
        [HttpPost]
        public IActionResult Contact(ContactUsVM contactusVm)
        {
            if (ModelState.IsValid)
            {
                if (contactusVm.UploadFile != null)
                { 
                    string folder = "ContactUsImgs/";
                    folder += Guid.NewGuid().ToString()+"_"+contactusVm.UploadFile.FileName;
                    contactusVm.UploadPath= folder;
                    string serverfolder = Path.Combine(_webHostEnvironment.WebRootPath, folder);

                    contactusVm.UploadFile.CopyToAsync(new FileStream(serverfolder, FileMode.Create));

                }
                var req = new ContactU()
                {
                    Name = contactusVm.Firstname + "_" + contactusVm.Lastname,
                    Email = contactusVm.Email,
                    Subject = contactusVm.Subject,
                    PhoneNumber = contactusVm.PhoneNumber,
                    Message = contactusVm.Message,
                    UploadFileName = contactusVm.UploadPath,
                    CreatedOn = DateTime.Now,
                    FileName = contactusVm.UploadFile.FileName,
                };
                var uploadData = _dbcontext.ContactUs.Add(req);
                _dbcontext.SaveChanges();

                //Mailing Admin
                var admindata = _dbcontext.Users.FirstOrDefault(x => x.UserTypeId == 3);
                string Subject = "Query Message";
                string Body = "<h2 style='text-align: center; background-color: #1D7A8C; color: white; padding: 10px 0; font-family: sans-serif;' > Helperland | Home Services </h2>" + "<span style='margin: 5px 0; color: #646464; font-size: 16px; font-family: sans-serif;'> Hello " + admindata.FirstName + ", <br> Someone need help, please check it"
                               + "<br>User Name: " + contactusVm.Firstname + " " + contactusVm.Lastname
                               + "<br>User Email: " + uploadData.Entity.Email
                               + "<br>User Phone number: " + uploadData.Entity.PhoneNumber
                               + "<br>Subject: " + uploadData.Entity.Subject
                               + "<br>Message: " + uploadData.Entity.Message
                               + "<br>File Name: " + uploadData.Entity.FileName;
                MailMessage msg = new MailMessage();
                msg.Body = Body;
                msg.Subject = Subject;
                msg.From = new MailAddress("sm.project.workstation@gmail.com", "Helperland");
                msg.To.Add(admindata.Email);
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
                //Mailing Admin

                return RedirectToAction(nameof(Contact), new { IsSubmit = "true"});
            }
            return View();
        }
        
        [Route("about")]
        public IActionResult About()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                var req = _dbcontext.Users.Where(x => x.UserId == Uid).FirstOrDefault();
                ViewBag.IsloggedIn = "success";
                ViewBag.Uname = req.FirstName;
                ViewBag.UType = req.UserTypeId;
            }
            else
            {
                ViewBag.UType = 1;
            }
            return View();
        }

        public IActionResult Error()
        {
            return View("error");
        }
    }
}