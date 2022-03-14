using Helperland.Data;
using Helperland.Models;
using Helperland.Models.viewModels;
using Microsoft.AspNetCore.Mvc;

namespace Helperland.Controllers
{
    public class AdminController : Controller
    {
        private readonly HelperlandDBContext _dbContext;
        public AdminController(HelperlandDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IActionResult Servicerequest()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                var req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

                if (req.UserTypeId == 3)
                {
                    ViewBag.Uname = req.FirstName + " " + req.LastName;
                    return View();
                }
                else
                {
                    ViewBag.UType = 1;
                    return RedirectToAction("Index", "Home");
                }
            }
            else
            {
                ViewBag.UType = 1;
                return RedirectToAction("Index", "Home");
            }
        }
        
        public IActionResult Usermanagement()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                var req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

                if (req.UserTypeId == 3)
                {
                    ViewBag.Uname = req.FirstName + " " + req.LastName;
                    return View();
                }
                else
                {
                    ViewBag.UType = 1;
                    return RedirectToAction("Index", "Home");
                }
            }
            else
            {
                ViewBag.UType = 1;
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpGet]
        public IActionResult GetUMAdminData()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                List<AdminUserManageVM> data = new();
                var req = _dbContext.Users.ToList();

                if (req.Count > 0)
                {
                    foreach (var item in req)
                    {
                        AdminUserManageVM res = new();
                        res.Name = item.FirstName + " " + item.LastName;
                        res.Date = item.CreatedDate.ToString("dd/MM/yyyy");
                        res.UType = item.UserTypeId;
                        res.Phone = item.Mobile;
                        if (item.ZipCode != null)
                        {
                            res.PostalCode = item.ZipCode;
                        }
                        else
                        {
                            res.PostalCode = "";
                        }
                        res.Email = item.Email;
                        res.Status = item.IsActive;
                        res.Approved = item.IsApproved;
                        data.Add(res);
                    }
                    return new JsonResult(data);
                }
                else
                {
                    return Json("notfound");
                }
            }
            else
            {
                return Json("notfound");
            }
        }
    }   
}
