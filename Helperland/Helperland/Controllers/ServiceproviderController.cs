using Helperland.Data;
using Helperland.Models.viewModels;
using Helperland.Models;
using Microsoft.AspNetCore.Mvc;

namespace Helperland.Controllers
{
    public class ServiceproviderController : Controller
    {
        private readonly HelperlandDBContext _dbContext;
        public ServiceproviderController(HelperlandDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IActionResult Dashboard()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                var req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

                if (req.UserTypeId == 2)
                {
                    ViewBag.IsloggedIn = "success";
                    ViewBag.Uname = req.FirstName;
                    return View();
                }
                else
                {
                    ViewBag.UType = 2;
                    return RedirectToAction("Index", "Home");
                }
            }
            else
            {
                ViewBag.UType = 2;
                return RedirectToAction("Index", "Home");
            }
        }

        public IActionResult NewServiceRequest()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                var req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

                if (req.UserTypeId == 2)
                {
                    ViewBag.IsloggedIn = "success";
                    ViewBag.Uname = req.FirstName;
                    return View();
                }
                else
                {
                    ViewBag.UType = 2;
                    return RedirectToAction("Index", "Home");
                }
            }
            else
            {
                ViewBag.UType = 2;
                return RedirectToAction("Index", "Home");
            }
        }

        public IActionResult UpcomingServices()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                var req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

                if (req.UserTypeId == 2)
                {
                    ViewBag.IsloggedIn = "success";
                    ViewBag.Uname = req.FirstName;
                    return View();
                }
                else
                {
                    ViewBag.UType = 2;
                    return RedirectToAction("Index", "Home");
                }
            }
            else
            {
                ViewBag.UType = 2;
                return RedirectToAction("Index", "Home");
            }
        }

        public IActionResult ServiceHistory() 
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                var req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

                if (req.UserTypeId == 2)
                {
                    ViewBag.IsloggedIn = "success";
                    ViewBag.Uname = req.FirstName;
                    return View();
                }
                else
                {
                    ViewBag.UType = 2;
                    return RedirectToAction("Index", "Home");
                }
            }
            else
            {
                ViewBag.UType = 2;
                return RedirectToAction("Index", "Home");
            } 
        }

        public IActionResult MyRatings()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                var req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

                if (req.UserTypeId == 2)
                {
                    ViewBag.IsloggedIn = "success";
                    ViewBag.Uname = req.FirstName;
                    return View();
                }
                else
                {
                    ViewBag.UType = 2;
                    return RedirectToAction("Index", "Home");
                }
            }
            else
            {
                ViewBag.UType = 2;
                return RedirectToAction("Index", "Home");
            }
        }

        public IActionResult MyAccount()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                var req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

                if (req.UserTypeId == 2)
                {
                    ViewBag.IsloggedIn = "success";
                    ViewBag.Uname = req.FirstName;
                    return View();
                }
                else
                {
                    ViewBag.UType = 2;
                    return RedirectToAction("Index", "Home");
                }
            }
            else
            {
                ViewBag.UType = 2;
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpGet]
        public IActionResult GetSerHistoryData()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                List<SPServiceHistoryVM> data = new();
                var req = _dbContext.ServiceRequests.Where(x => x.ServiceProviderId == Uid && x.Status == 1).ToList();

                if (req.Count > 0)
                {
                    foreach (var item in req)
                    {
                        SPServiceHistoryVM res = new();
                        res.ServiceId = item.ServiceRequestId;
                        res.ServiceDate = item.ServiceStartDate.ToString("dd/MM/yyyy");
                        res.ServiceStartTime = item.ServiceStartDate.ToString("HH:mm");
                        res.ServiceEndTime = item.ServiceStartDate.AddHours((double)item.SubTotal).ToString("HH:mm");
                        
                        var cData = _dbContext.Users.FirstOrDefault(x => x.UserId == item.UserId);
                        res.CustName = cData.FirstName + " " + cData.LastName;

                        var AddressData = _dbContext.ServiceRequestAddresses.FirstOrDefault(x => x.ServiceRequestId == item.ServiceRequestId);

                        res.AddLine1 = AddressData.AddressLine1; 
                        res.AddLine2 = AddressData.AddressLine2;
                        res.PostalCode = AddressData.PostalCode;
                        res.City = AddressData.City;

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

        [HttpGet]
        public IActionResult GetServiceReqSummary(int Reqid)
        {
            if (Reqid != null)
            {
                var serviceReq = _dbContext.ServiceRequests.FirstOrDefault(x => x.ServiceRequestId == Reqid);
                var serReqAdd = _dbContext.ServiceRequestAddresses.FirstOrDefault(x => x.ServiceRequestId == Reqid);
                var serReqExtraa = _dbContext.ServiceRequestExtras.Where(x => x.ServiceRequestId == Reqid).ToList();

                ServiceReqSumVM res = new();

                res.ServiceId = serviceReq.ServiceRequestId;
                res.ServiceDateTime = serviceReq.ServiceStartDate.ToString("dd/MM/yyyy") + " " + serviceReq.ServiceStartDate.ToString("HH:mm") + "-" + serviceReq.ServiceStartDate.AddHours((double)serviceReq.SubTotal).ToString("HH:mm");
                res.Duration = serviceReq.SubTotal;
                res.NetPay = serviceReq.TotalCost;
                res.Pets = serviceReq.HasPets;
                res.Address = serReqAdd.AddressLine1 + " " + serReqAdd.AddressLine2 + ", " + serReqAdd.PostalCode + " " + serReqAdd.City;
                res.Phone = serReqAdd.Mobile;
                res.Email = serReqAdd.Email;
                res.Comment = serviceReq.Comments;


                foreach (var item in serReqExtraa)
                {
                    if (item.ServiceExtraId == 1)
                    {
                        res.Cabinet = true;
                    }
                    else if (item.ServiceExtraId == 2)
                    {
                        res.Fridge = true;
                    }
                    else if (item.ServiceExtraId == 3)
                    {
                        res.Oven = true;
                    }
                    else if (item.ServiceExtraId == 4)
                    {
                        res.Wash = true;
                    }
                    else if (item.ServiceExtraId == 5)
                    {
                        res.Window = true;
                    }
                }

                return new JsonResult(res);
            }
            else
            {
                return Json("notfound");
            }
        }

        [HttpGet]
        public IActionResult GetMyRatingsData()
        
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            List<SPMyRatingsVM> data = new();

            var req = _dbContext.Ratings.Where(x => x.RatingTo == Uid).ToList();
            if (req.Count()>0)
            {
                foreach (var item in req)
                {
                    SPMyRatingsVM res = new();
                    res.ServiceId = item.ServiceRequestId;
                    res.Rating = item.Ratings;
                    res.Comment = item.Comments;
                    
                    var custName = _dbContext.Users.FirstOrDefault(x => x.UserId == item.RatingFrom);
                    res.CustomerName = custName.FirstName + " " + custName.LastName;

                    var serReqData = _dbContext.ServiceRequests.FirstOrDefault(x => x.ServiceRequestId == item.ServiceRequestId);
                    res.ServiceDate = serReqData.ServiceStartDate.ToString("dd/MM/yyyy");
                    res.ServiceStartTime = serReqData.ServiceStartDate.ToString("HH:mm");
                    res.ServiceEndTime = serReqData.ServiceStartDate.AddHours((double)serReqData.SubTotal).ToString("HH:mm");

                    if(item.Ratings <= 5 && item.Ratings > 4)
                    {
                        res.RatingTitle = "Excellent";
                    }else if (item.Ratings <= 4 && item.Ratings > 3)
                    {
                        res.RatingTitle = "Very Good";
                    }else if (item.Ratings <= 3 && item.Ratings > 2)
                    {
                        res.RatingTitle = "Good";
                    }else if (item.Ratings <= 2 && item.Ratings > 1)
                    {
                        res.RatingTitle = "Poor";
                    }else if (item.Ratings <= 1 && item.Ratings > 0)
                    {
                        res.RatingTitle = "Very Poor";
                    }

                    data.Add(res);
                }

                return new JsonResult(data);
            }
            else
            {
                return Json("notfound");
            }
        }
    }
}
