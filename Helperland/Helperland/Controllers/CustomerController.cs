using Helperland.Data;
using Microsoft.AspNetCore.Mvc;

namespace Helperland.Controllers
{
    public class CustomerController : Controller
    {
        private readonly HelperlandDBContext _dbContext;

        public CustomerController(HelperlandDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IActionResult Servicerequest()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            var req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

            ViewBag.Uname = req.FirstName;
            ViewBag.UType = req.UserTypeId;
            return View();
        }

        [Route("book-service")]
        public IActionResult Bookservice()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                var req = _dbContext.Users.Where(x => x.UserId == Uid).FirstOrDefault();
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
    }
}
