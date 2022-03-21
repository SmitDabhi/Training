using Helperland.Data;
using Helperland.Models;
using Helperland.Models.viewModels;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;

namespace Helperland.Controllers
{
    public class AdminController : Controller
    {
        private readonly HelperlandDBContext _dbContext;
        private readonly IConfiguration _config;

        public AdminController(HelperlandDBContext dbContext, IConfiguration config)
        {
            _dbContext = dbContext;
            _config = config;
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
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
        
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
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
                req.ModifiedDate = DateTime.Now;
                req.ModifiedBy = (int)Uid;
                
                _dbContext.Users.Update(req);
                _dbContext.SaveChanges();

                Zipcode add = _dbContext.Zipcodes.FirstOrDefault(x => x.ZipcodeValue == req.ZipCode);
                if(add != null)
                {
                    add.ZipcodeValue = "0";
                    _dbContext.Zipcodes.Update(add);
                    _dbContext.SaveChanges();
                }

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
                req.ModifiedDate = DateTime.Now;
                req.ModifiedBy = (int)Uid;

                _dbContext.Users.Update(req);
                _dbContext.SaveChanges();

                Zipcode add = _dbContext.Zipcodes.FirstOrDefault(x => x.ZipcodeValue == "0");
                if (add != null)
                {
                    add.ZipcodeValue = req.ZipCode;
                    _dbContext.Zipcodes.Update(add);
                    _dbContext.SaveChanges();
                }

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
                req.ModifiedBy= (int)Uid;
                req.ModifiedDate= DateTime.Now;

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

        [HttpPost]
        public IActionResult CancelReq(int Reqid)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                ServiceRequest req = _dbContext.ServiceRequests.FirstOrDefault(x => x.ServiceRequestId == Reqid);
                if (req != null)
                {
                    req.Status = 0;
                    req.ModifiedDate = DateTime.Now;
                    req.ModifiedBy = (int)Uid;

                    _dbContext.ServiceRequests.Update(req);
                    _dbContext.SaveChanges();

                    return Json("true");
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
        public IActionResult GetEditModalData(int Reqid)
        {
            var req = _dbContext.ServiceRequests.FirstOrDefault(x => x.ServiceRequestId == Reqid);

            if(req != null)
            {
                AdminEditModalVM res = new();
                res.Id = req.ServiceRequestId;
                res.Date = req.ServiceStartDate.ToString("dd/MM/yyyy");
                res.Time = req.ServiceStartDate.ToString("HH:mm");
                res.Comment = req.Comments;

                var reqAdd = _dbContext.ServiceRequestAddresses.FirstOrDefault(x => x.ServiceRequestId == req.ServiceRequestId);
                res.AddLine1 = reqAdd.AddressLine1;
                res.AddLine2 = reqAdd.AddressLine2;
                res.City = reqAdd.City;
                res.Pincode = reqAdd.PostalCode;

                return new JsonResult(res);
            }
            else
            {
                return Json("notfound");
            }
        }

        [HttpPost]
        public IActionResult ValidateZip(string Pin)
        {
            var req = _dbContext.Zipcodes.FirstOrDefault(x => x.ZipcodeValue == Pin);
            if(req != null)
            {
                var res = _dbContext.Cities.FirstOrDefault(x => x.Id == req.CityId).CityName;

                return Json(res);
            }
            else
            {
                return Json("false");
            }
        }

        [HttpPost]
        public IActionResult UpdateService(AdminEditModalVM data)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if(Uid != null)
            {
                ServiceRequest req = _dbContext.ServiceRequests.FirstOrDefault(x => x.ServiceRequestId == data.Id);
                if (req != null)
                {
                    req.ServiceStartDate = DateTime.ParseExact(data.Date+" "+data.Time, "dd/MM/yyyy HH:mm", null);
                    req.Comments = data.Comment;
                    req.ModifiedBy = Uid;
                    req.ModifiedDate = DateTime.Now;

                    _dbContext.ServiceRequests.Update(req);
                    _dbContext.SaveChanges();

                    ServiceRequestAddress reqAdd = _dbContext.ServiceRequestAddresses.FirstOrDefault(x => x.ServiceRequestId == req.ServiceRequestId);

                    if(reqAdd != null)
                    {
                        reqAdd.AddressLine1 = data.AddLine1;
                        reqAdd.AddressLine2 = data.AddLine2;
                        reqAdd.City = data.City;
                        reqAdd.PostalCode = data.Pincode;

                        _dbContext.ServiceRequestAddresses.Update(reqAdd);
                        _dbContext.SaveChanges();
                    }

                    if(req.UserId != null)
                    {
                        var custData = _dbContext.Users.FirstOrDefault(x => x.UserId == req.UserId);
                        string Subject = "Changes in Service Request";
                        string Body = "<h2 style='text-align: center; background-color: #1D7A8C; color: white; padding: 10px 0; font-family: sans-serif;' > Helperland | Home Services </h2>" + "<span style='margin: 5px 0; color: #646464; font-size: 16px; font-family: sans-serif;'> Hello " + custData.FirstName + ", <br> Service request " + req.ServiceRequestId + " has been updated by Admin. <br></span>";
                        MailMessage msg = new MailMessage();
                        msg.Body = Body;
                        msg.Subject = Subject;
                        msg.From = new MailAddress("sm.project.workstation@gmail.com", "Helperland");
                        msg.To.Add(custData.Email);
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
                    }

                    if (req.ServiceProviderId != null)
                    {
                        var spEmail = _dbContext.Users.FirstOrDefault(x => x.UserId == req.ServiceProviderId);
                        string Subject = "Changes in Service Request";
                        string Body = "<h2 style='text-align: center; background-color: #1D7A8C; color: white; padding: 10px 0; font-family: sans-serif;' > Helperland | Home Services </h2>" + "<span style='margin: 5px 0; color: #646464; font-size: 16px; font-family: sans-serif;'> Hello "+ spEmail.FirstName +", <br> Service request "+ req.ServiceRequestId +" has been updated by Admin. <br></span>";
                        MailMessage msg = new MailMessage();
                        msg.Body = Body;
                        msg.Subject = Subject;
                        msg.From = new MailAddress("sm.project.workstation@gmail.com", "Helperland");
                        msg.To.Add(spEmail.Email);
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
                    }
                    return Json("true");
                }
                else
                {
                    return Json("false");
                }
            }
            else
            {
                return Json("false");
            }
        }

        [HttpGet]
        public IActionResult CheckRefund(int Id)
        {
            var req = _dbContext.ServiceRequests.FirstOrDefault(x => x.ServiceRequestId == Id).RefundedAmount;

            if(req != null)
            {
                return Json(req);
            }
            else
            {
                return Json("false");
            }
        }

        [HttpPost]
        public IActionResult RefundAmount(int Id, int Refund)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");

            ServiceRequest req = _dbContext.ServiceRequests.FirstOrDefault(x => x.ServiceRequestId == Id);

            req.RefundedAmount = Refund;
            req.ModifiedBy = Uid;
            req.ModifiedDate = DateTime.Now;

            _dbContext.ServiceRequests.Update(req);
            _dbContext.SaveChanges();

            return Json("true");
        }
    }   
}
