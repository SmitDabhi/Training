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
                var req = _dbContext.Users.Where(x => x.IsDeleted == false).ToList();

                if (req.Count > 0)
                {
                    foreach (var item in req)
                    {
                        AdminUserManageVM res = new();
                        res.Id = item.UserId;
                        res.Name = item.FirstName + " " + item.LastName;
                        res.Date = item.CreatedDate.ToString("dd/MM/yyyy");
                        res.Phone = item.Mobile;

                        if(item.UserTypeId == 1)
                        {
                            res.UType = "Customer";
                        }
                        else if (item.UserTypeId == 2)
                        {
                            res.UType = "Service Provider";
                        }
                        else if (item.UserTypeId == 3)
                        {
                            res.UType = "Admin";
                        }

                        if (item.ZipCode != null)
                        {
                            res.PostalCode = item.ZipCode;
                        }
                        else
                        {
                            res.PostalCode = "";
                        }
                        res.Email = item.Email;
                        if (item.IsActive)
                        {
                            res.Status = "Active";
                        }
                        else if(!item.IsActive && item.IsApproved) 
                        {
                            res.Status = "Inactive";
                        }else if (!item.IsActive && !item.IsApproved)
                        {
                            res.Status = "Not Approved";
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
            else
            {
                return Json("notfound");
            }
        }

        [HttpPost]
        public  IActionResult DeactivateUser(int Id)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                User req = _dbContext.Users.FirstOrDefault(x => x.UserId == Id);
                req.IsActive = false;
                
                _dbContext.Users.Update(req);
                _dbContext.SaveChanges();

                return Json("true");
            }
            else
            {
                return Json("notfound");
            }
        }

        [HttpPost]
        public  IActionResult ActivateUser(int Id)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                User req = _dbContext.Users.FirstOrDefault(x => x.UserId == Id);
                req.IsActive = true;

                _dbContext.Users.Update(req);
                _dbContext.SaveChanges();

                return Json("true");
            }
            else
            {
                return Json("notfound");
            }
        }

        [HttpPost]
        public  IActionResult ApproveUser(int Id)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                User req = _dbContext.Users.FirstOrDefault(x => x.UserId == Id);
                req.IsActive = true;
                req.IsApproved = true;

                _dbContext.Users.Update(req);
                _dbContext.SaveChanges();

                return Json("true");
            }
            else
            {
                return Json("notfound");
            }
        }

        [HttpGet]
        public IActionResult GetSRAdminData()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                List<AdminServReqVM> data = new();

                var req = _dbContext.ServiceRequests.ToList();

                if (req.Count() > 0)
                {
                    foreach (var item in req)
                    {
                        AdminServReqVM res = new();
                        res.Id = item.ServiceRequestId;
                        res.ServiceDate = item.ServiceStartDate.ToString("dd/MM/yyyy");
                        res.ServiceStartTime = item.ServiceStartDate.ToString("HH:mm");
                        res.ServiceEndTime = item.ServiceStartDate.AddHours((double)item.SubTotal).ToString("HH:mm");
                        res.Payment = item.TotalCost;

                        var cData = _dbContext.Users.FirstOrDefault(x => x.UserId == item.UserId);
                        res.CustName = cData.FirstName + " " + cData.LastName;
                        res.Email = cData.Email;

                        var AddressData = _dbContext.ServiceRequestAddresses.FirstOrDefault(x => x.ServiceRequestId == item.ServiceRequestId);

                        res.AddLine1 = AddressData.AddressLine1;
                        res.AddLine2 = AddressData.AddressLine2;
                        res.PostalCode = AddressData.PostalCode;
                        res.City = AddressData.City;

                        if (item.ServiceProviderId != null)
                        {
                            User spData = _dbContext.Users.FirstOrDefault(x => x.UserId == item.ServiceProviderId);
                            res.SPName = spData.FirstName + " " + spData.LastName;
                            res.ProfIcon = spData.UserProfilePicture;
                            
                            var rating = _dbContext.Ratings.Where(x => x.RatingTo == item.ServiceProviderId);
                            if (rating.Count() > 0)
                            {
                                res.Rating = Math.Round(rating.Average(x => x.Ratings), 1);
                            }
                            else
                            {
                                res.Rating = 0;
                            }
                        }

                        if(item.ServiceProviderId == null && item.Status == null)
                        {
                            res.Status = "New";
                        }
                        else if (item.ServiceProviderId == null && item.Status == 0)
                        {
                            res.Status = "Cancelled";
                        }
                        else if (item.ServiceProviderId != null && item.Status == null)
                        {
                            res.Status = "Pending";
                        }
                        else if (item.ServiceProviderId != null && item.Status == 0)
                        {
                            res.Status = "Cancelled";
                        }
                        else if (item.ServiceProviderId != null && item.Status == 1)
                        {
                            res.Status = "Completed";
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
            else
            {
                return Json("notfound");
            }
        }

        [HttpGet]
        public IActionResult GetReqData(int? Reqid)
        {
            if(Reqid != null)
            {
                var serviceReq = _dbContext.ServiceRequests.FirstOrDefault(x => x.ServiceRequestId == Reqid);
                var serReqAdd = _dbContext.ServiceRequestAddresses.FirstOrDefault(x => x.ServiceRequestId == Reqid);
                var serReqExtraa = _dbContext.ServiceRequestExtras.Where(x => x.ServiceRequestId == Reqid).ToList();

                ServiceReqSumVM res = new();

                res.ServiceId = serviceReq.ServiceRequestId;
                res.ServiceDateTime = serviceReq.ServiceStartDate.ToString("dd/MM/yyyy")+" "+ serviceReq.ServiceStartDate.ToString("HH:mm")+"-"+ serviceReq.ServiceStartDate.AddHours((double)serviceReq.SubTotal).ToString("HH:mm");
                res.Duration = serviceReq.SubTotal;
                res.NetPay = serviceReq.TotalCost;
                res.Pets = serviceReq.HasPets;
                res.Address = serReqAdd.AddressLine1 + " " + serReqAdd.AddressLine2 + ", " + serReqAdd.PostalCode + " " + serReqAdd.City;
                res.Phone = serReqAdd.Mobile;
                res.Email = serReqAdd.Email;
                res.Comment = serviceReq.Comments;


                foreach (var item in serReqExtraa)
                {
                    if(item.ServiceExtraId == 1)
                    {
                        res.Cabinet = true;
                    }else if (item.ServiceExtraId == 2)
                    {
                        res.Fridge = true;
                    }else if (item.ServiceExtraId == 3)
                    {
                        res.Oven = true;
                    }else if (item.ServiceExtraId == 4)
                    {
                        res.Wash = true;
                    }else if (item.ServiceExtraId == 5)
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
    }   
}
