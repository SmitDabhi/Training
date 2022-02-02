using Helperland.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Helperland.Models.viewModels;
using Helperland.Data;

namespace Helperland.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly HelperlandDBContext _dbcontext;

        public HomeController(ILogger<HomeController> logger, HelperlandDBContext dbcontext, IWebHostEnvironment webHostEnvironment)
        {
            _logger = logger;
            _webHostEnvironment = webHostEnvironment;
            _dbcontext = dbcontext;
        }

        public IActionResult Index()
        {
            return View();
        }

        [Route("price")]
        public IActionResult Price()
        {
            return View();
        }
        
        [Route("faq")]
        public IActionResult Faq()
        {
            return View();
        }

        [Route("contact")]
        public IActionResult Contact(bool IsSubmit=false)
        {   
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
                _dbcontext.ContactUs.Add(req);
                _dbcontext.SaveChanges();
                return RedirectToAction(nameof(Contact), new { IsSubmit = "true"});
            }
            return View();
        }
        
        [Route("about")]
        public IActionResult About()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}