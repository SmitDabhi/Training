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
    }
}
