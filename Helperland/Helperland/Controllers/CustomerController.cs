using Helperland.Data;
using Helperland.Models.viewModels;
using Helperland.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System;

namespace Helperland.Controllers
{
    public class CustomerController : Controller
    {
        private readonly HelperlandDBContext _dbContext;
        private readonly IConfiguration _config;

        public CustomerController(HelperlandDBContext dbContext, IConfiguration config)
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

                if (req.UserTypeId == 1)
                {
                    ViewBag.IsloggedIn = "success";
                    ViewBag.Uname = req.FirstName;
                    ViewBag.UType = req.UserTypeId;
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
        [Route("book-service")]
        public IActionResult Bookservice()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                var req = _dbContext.Users.Where(x => x.UserId == Uid).FirstOrDefault();
                if(req.UserTypeId == 1)
                {
                    ViewBag.IsloggedIn = "success";
                    ViewBag.Uname = req.FirstName;
                    ViewBag.UType = req.UserTypeId;
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
                return RedirectToAction("Index", "Home", new { login = "true" });
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Dashboard()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if(Uid != null)
            {
                var req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);
                if(req.UserTypeId == 1)
                {
                    ViewBag.IsloggedIn = "success";
                    ViewBag.Uname = req.FirstName;
                    ViewBag.UType = req.UserTypeId;
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
        public IActionResult Myaccount()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if(Uid != null)
            {
                var req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

                if(req.UserTypeId == 1)
                {
                    ViewBag.IsloggedIn = "success";
                    ViewBag.Uname = req.FirstName;
                    ViewBag.UType = req.UserTypeId;
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
        public IActionResult FavouritePro()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if(Uid != null)
            {
                var req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

                if(req.UserTypeId == 1)
                {
                    ViewBag.IsloggedIn = "success";
                    ViewBag.Uname = req.FirstName;
                    ViewBag.UType = req.UserTypeId;
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
        public IActionResult GetFavProData()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");

            List<spBlockCustVM> data = new();
            if (Uid != null)
            {
                var req = _dbContext.ServiceRequests.Where(x => x.UserId == Uid && x.Status == 1).ToList().DistinctBy(x => x.ServiceProviderId);
                if (req.Count() > 0)
                {
                    foreach (var item in req)
                    {
                        spBlockCustVM res = new();
                        res.Uid = (int)item.ServiceProviderId;

                        var userData = _dbContext.Users.FirstOrDefault(x => x.UserId == item.ServiceProviderId);
                        res.Name = userData.FirstName + " " + userData.LastName;
                        res.ProfIcon = userData.UserProfilePicture;

                        var rating = _dbContext.Ratings.Where(x => x.RatingTo == item.ServiceProviderId);
                        if (rating.Count() > 0)
                        {
                            res.Rating = Math.Round(rating.Average(x => x.Ratings), 1);
                        }
                        else
                        {
                            res.Rating = 0;
                        }

                        res.ServCount = _dbContext.ServiceRequests.Where(x => x.ServiceProviderId == item.ServiceProviderId && x.Status == 1).Count();

                        var favData = _dbContext.FavoriteAndBlockeds.FirstOrDefault(x=>x.UserId == Uid && x.TargetUserId==item.ServiceProviderId);
                        
                        if (favData != null)
                        {
                            if(favData.IsBlocked == true)
                            {
                                res.IsBlocked = true;
                            }
                            else
                            {
                                res.IsBlocked= false;
                            }
                            
                            if(favData.IsFavorite == true)
                            {
                                res.IsFav = true;
                            }
                            else
                            {
                                res.IsFav= false;
                            }
                        }
                        else
                        {
                            res.IsBlocked = false;
                            res.IsFav = false;
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
        public IActionResult ValidZip(ValidZipVM validZip)
        {
            if (ModelState.IsValid)
            {
                var zip = _dbContext.Zipcodes.FirstOrDefault(x=>x.ZipcodeValue == validZip.PostalCode);
                if (zip != null)
                {
                    TempData["zipCode"] = zip.ZipcodeValue;
                    
                    var city = _dbContext.Cities.FirstOrDefault(x=>x.Id == zip.CityId);
                    var CityName = city.CityName;
                    var obj = new { Results = "Success", City = CityName };
                    return Json(obj);
                }
                else
                {
                    var obj = new { Results = "Fail"};
                    return Json(obj);
                }
            }
            var invalidObj = new { Results = "Invalid"};
            return Json(invalidObj);

        }

        [HttpGet]
        public IActionResult GetAddresses()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            List<GetAddressVM> addresses = new List<GetAddressVM>();

            var zipCode = Convert.ToString(TempData["zipCode"]);
            TempData.Keep("zipCode");

            var userAddresses = _dbContext.UserAddresses.Where(x=>x.UserId == Uid && x.PostalCode == zipCode && x.IsDeleted == false).ToList();

            if(userAddresses.Count > 0)
            {
                foreach (var item in userAddresses)
                {
                    GetAddressVM add = new GetAddressVM();
                    add.Id = item.AddressId;
                    add.AddressLine1 = item.AddressLine1;
                    add.AddressLine2 = item.AddressLine2;
                    add.City = item.City;
                    add.Mobile = item.Mobile;
                    add.PostalCode = item.PostalCode;
                    add.IsDeleted = item.IsDeleted;

                    addresses.Add(add);
                }
                return new JsonResult(addresses);
            }
            else
            {
                return Json("notfound");
            }


        }

        [HttpGet]
        public IActionResult GetFavSP()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                List<FavSPVM> data = new();
                var req = _dbContext.FavoriteAndBlockeds.Where(x => x.UserId == Uid && x.IsFavorite == true).ToList();
                if(req.Count > 0)
                {
                    foreach (var item in req)
                    {
                        FavSPVM res = new();
                        res.SPID = item.TargetUserId;
                        var spdata = _dbContext.Users.FirstOrDefault(x => x.UserId == item.TargetUserId);
                        res.SPName = spdata.FirstName + " " + spdata.LastName;
                        res.ProfIcon = spdata.UserProfilePicture;

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
        public IActionResult AddressSave(UserAddress userAddress)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                var city = _dbContext.Cities.FirstOrDefault(x => x.CityName == userAddress.City);
                var state = _dbContext.States.FirstOrDefault(x => x.Id == city.StateId);

                User user = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);
                userAddress.UserId = user.UserId;
                userAddress.Email = user.Email;
                userAddress.State = state.StateName;
                userAddress.IsDefault = false;
                userAddress.IsDeleted = false;

                _dbContext.UserAddresses.Add(userAddress);
                _dbContext.SaveChanges();

                return Json("true");
            }
            else
            {
                return Json("false");
            }
        }

        [HttpPost]
        public IActionResult CompleteBooking(CompleteBookVM completeBook)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");

            if (Uid != null)
            {
                ServiceRequest req = new();
                req.UserId = (int)Uid;
                req.ServiceId = (int)Uid;
                req.ServiceStartDate = DateTime.ParseExact(completeBook.StartDateTIme, "d/M/yyyy hh:mm tt", System.Globalization.CultureInfo.InvariantCulture);
                req.ZipCode = completeBook.PostalCode;
                req.ServiceHourlyRate = 30;
                req.ServiceHours = completeBook.Duration;
                req.ExtraHours = completeBook.ExtraHours;
                req.SubTotal = (decimal)completeBook.Duration + (decimal)completeBook.ExtraHours;
                req.TotalCost = (decimal)(req.SubTotal * req.ServiceHourlyRate);
                req.Comments = completeBook.Comment;
                req.HasPets = completeBook.HasPet;
                req.PaymentDue = false;
                req.PaymentDone = true;
                req.CreatedDate = DateTime.Now;
                req.ModifiedDate = DateTime.Now;
                req.ModifiedBy = Uid;
                req.Distance = 0;

                if (completeBook.SpId != null)
                {
                    var check = _dbContext.ServiceRequests.Where(x => x.ServiceProviderId == completeBook.SpId && x.Status == null).ToList();

                    if (check.Count() > 0)
                    {
                        var conflict = false;
                        var sDt = "";
                        var eDt = "";

                        foreach (var i in check)
                        {
                            var newSerStartDT = DateTime.ParseExact(completeBook.StartDateTIme, "d/M/yyyy hh:mm tt", System.Globalization.CultureInfo.InvariantCulture);
                            var newSerEndDT = DateTime.ParseExact(completeBook.StartDateTIme, "d/M/yyyy hh:mm tt", System.Globalization.CultureInfo.InvariantCulture).AddHours((double)completeBook.Duration + (double)completeBook.ExtraHours);
                            var accSerStartDT = i.ServiceStartDate;
                            var accSerEndDT = i.ServiceStartDate.AddHours((double)i.SubTotal + 1);

                            if (newSerStartDT >= accSerStartDT && newSerStartDT <= accSerEndDT)
                            {
                                conflict = true;
                                sDt = accSerStartDT.ToString();
                                eDt = accSerEndDT.ToString();
                                break;
                            }
                            else if (newSerEndDT >= accSerStartDT && newSerEndDT <= accSerEndDT)
                            {
                                conflict = true;
                                sDt = accSerStartDT.ToString();
                                eDt = accSerEndDT.ToString();
                                break;

                            }
                            else if (newSerStartDT < accSerStartDT && newSerEndDT > accSerEndDT)
                            {
                                conflict = true;
                                sDt = accSerStartDT.ToString();
                                eDt = accSerEndDT.ToString();
                                break;
                            }
                        }

                        if (conflict)
                        {
                            var obj = new
                            {
                                msg = "con",
                                startDate = sDt,
                                endDate = eDt
                            };
                            return Json(obj);
                        }
                    }

                    req.ServiceProviderId = completeBook.SpId;
                    req.SpacceptedDate = DateTime.Now;
                }
                
                
                var ServiceRequest = _dbContext.ServiceRequests.Add(req);
                _dbContext.SaveChanges();

                UserAddress userReq = _dbContext.UserAddresses.FirstOrDefault(x => x.AddressId == completeBook.AddressId);
                var city = _dbContext.Cities.FirstOrDefault(x => x.CityName == userReq.City);
                var state = _dbContext.States.FirstOrDefault(x => x.Id == city.StateId);

                ServiceRequestAddress serviceRequestAddress = new();
                serviceRequestAddress.AddressLine1 = userReq.AddressLine1;
                serviceRequestAddress.AddressLine2 = userReq.AddressLine2;
                serviceRequestAddress.City = userReq.City;
                serviceRequestAddress.PostalCode = userReq.PostalCode;
                serviceRequestAddress.State = state.StateName;
                serviceRequestAddress.Mobile = userReq.Mobile;
                serviceRequestAddress.ServiceRequestId = ServiceRequest.Entity.ServiceRequestId;
                serviceRequestAddress.Email = userReq.Email;

                _dbContext.ServiceRequestAddresses.Add(serviceRequestAddress);
                _dbContext.SaveChanges();

                if (completeBook.Cabinet)
                {
                    ServiceRequestExtra requestExtra = new();
                    requestExtra.ServiceRequestId = ServiceRequest.Entity.ServiceRequestId;
                    requestExtra.ServiceExtraId = 1;
                    _dbContext.ServiceRequestExtras.Add(requestExtra);
                    _dbContext.SaveChanges();
                }

                if (completeBook.Fridge)
                {
                    ServiceRequestExtra requestExtra = new();
                    requestExtra.ServiceRequestId = ServiceRequest.Entity.ServiceRequestId;
                    requestExtra.ServiceExtraId = 2;
                    _dbContext.ServiceRequestExtras.Add(requestExtra);
                    _dbContext.SaveChanges();
                }

                if (completeBook.Oven)
                {
                    ServiceRequestExtra requestExtra = new();
                    requestExtra.ServiceRequestId = ServiceRequest.Entity.ServiceRequestId;
                    requestExtra.ServiceExtraId = 3;
                    _dbContext.ServiceRequestExtras.Add(requestExtra);
                    _dbContext.SaveChanges();
                }

                if (completeBook.Wash)
                {
                    ServiceRequestExtra requestExtra = new();
                    requestExtra.ServiceRequestId = ServiceRequest.Entity.ServiceRequestId;
                    requestExtra.ServiceExtraId = 4;
                    _dbContext.ServiceRequestExtras.Add(requestExtra);
                    _dbContext.SaveChanges();
                }

                if (completeBook.Windows)
                {
                    ServiceRequestExtra requestExtra = new();
                    requestExtra.ServiceRequestId = ServiceRequest.Entity.ServiceRequestId;
                    requestExtra.ServiceExtraId = 5;
                    _dbContext.ServiceRequestExtras.Add(requestExtra);
                    _dbContext.SaveChanges();
                }

                //Mailing SP
                var pin = ServiceRequest.Entity.ZipCode;

                var reqEmail = _dbContext.Users.Where(x => x.ZipCode == pin && x.UserTypeId == 2).ToList();

                if (completeBook.SpId != null)
                {
                    var spEmailData = _dbContext.Users.FirstOrDefault(x => x.UserId == completeBook.SpId);

                    string Subject = "New Service Request";
                    string Body = "<h2 style='text-align: center; background-color: #1D7A8C; color: white; padding: 10px 0; font-family: sans-serif;' > Helperland | Home Services </h2>" + "<span style='margin: 5px 0; color: #646464; font-size: 16px; font-family: sans-serif;'> Hello " + spEmailData.FirstName + ", <br> A service request " + ServiceRequest.Entity.ServiceRequestId + " has been directly assigned to you, <br>Please check it out. <br>" + "<a href='" + Url.Action("Index", "Home", new { }, "https") + "' style ='text-decoration: none; cursor: pointer; color: #1D7A8C; font-size: 16px; font-family: sans-serif; font-weight:bold'>Check<br></a></span>";
                    MailMessage msg = new MailMessage();
                    msg.Body = Body;
                    msg.Subject = Subject;
                    msg.From = new MailAddress("sm.project.workstation@gmail.com", "Helperland");
                    msg.To.Add(spEmailData.Email);
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
                else
                {
                    foreach (var item in reqEmail)
                    {
                        if (!_dbContext.FavoriteAndBlockeds.Any(x => x.UserId == item.UserId && x.TargetUserId == Uid && x.IsBlocked == true) && !_dbContext.FavoriteAndBlockeds.Any(x => x.UserId == Uid && x.TargetUserId == item.UserId && x.IsBlocked == true))
                        {
                            string Subject = "New Service Request";
                            string Body = "<h2 style='text-align: center; background-color: #1D7A8C; color: white; padding: 10px 0; font-family: sans-serif;' > Helperland | Home Services </h2>" + "<span style='margin: 5px 0; color: #646464; font-size: 16px; font-family: sans-serif;'> Hello Service Providers, <br> New service request available in your area, Please check it out. <br>" + "<a href='" + Url.Action("Index", "Home", new { }, "https") + "' style ='text-decoration: none; cursor: pointer; color: #1D7A8C; font-size: 16px; font-family: sans-serif; font-weight:bold'>Check<br></a></span>";
                            MailMessage msg = new MailMessage();
                            msg.Body = Body;
                            msg.Subject = Subject;
                            msg.From = new MailAddress("sm.project.workstation@gmail.com", "Helperland");
                            msg.To.Add(item.Email);
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
                    }
                }
                    
                //Mailing SP

                return Json(ServiceRequest.Entity.ServiceRequestId);

            }
            else
            {
                return Json("false");
            }
        }

        [HttpPost]
        public IActionResult PassChange(PassChangeVM passChangeVM)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            User req = _dbContext.Users.FirstOrDefault(y => y.UserId == Uid);

            if(BCrypt.Net.BCrypt.Verify(passChangeVM.OldPassword, req.Password))
            {
                if (ModelState.IsValid)
                {
                    if(passChangeVM.NewPassword == passChangeVM.ConfirmPassword)
                    {
                        if(BCrypt.Net.BCrypt.Verify(passChangeVM.NewPassword, req.Password)){
                            return Json("SamePass");
                        }
                        else
                        {
                            req.Password = BCrypt.Net.BCrypt.HashPassword(passChangeVM.NewPassword);
                            req.ModifiedDate = DateTime.Now;
                            _dbContext.Users.Update(req);
                            _dbContext.SaveChanges();
                            
                            return Json("Success");
                        }

                    }
                    else
                    {
                        return Json("PassNotMatch");
                    }
                }
                else
                {
                    return Json("PassNotValid");
                }
            }
            else
            {
                return Json("PassNotFound");
            }
        }

        [HttpGet]
        public IActionResult GetAddressAcc()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            List<GetAddressVM> addresses = new List<GetAddressVM>();

            var userAddresses = _dbContext.UserAddresses.Where(x => x.UserId == Uid && x.IsDeleted == false).ToList();

            if (userAddresses.Count > 0)
            {
                foreach (var item in userAddresses)
                {
                    GetAddressVM add = new();
                    add.Id = item.AddressId;
                    add.AddressLine1 = item.AddressLine1;
                    add.AddressLine2 = item.AddressLine2;
                    add.City = item.City;
                    add.Mobile = item.Mobile;
                    add.PostalCode = item.PostalCode;
                    add.IsDeleted = item.IsDeleted;

                    addresses.Add(add);
                }
                return new JsonResult(addresses);
            }
            else
            {
                return Json("notfound");
            }
        }

        [HttpGet]
        public IActionResult GetDataAcc()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");

            var reqData = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

            if(reqData != null)
            {
                var userData = new {
                    Fname = reqData.FirstName,
                    Lname = reqData.LastName,
                    Email = reqData.Email,
                    Mobile = reqData.Mobile,
                    DoB = reqData.DateOfBirth
                };
               
                
                return Json(userData);
            }
            else
            {
                return Json("notfound");
            }
        }

        [HttpPost]
        public IActionResult UpdateUserData(UserDataVM userData)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            User req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

            req.FirstName = userData.Fname;
            req.LastName = userData.Lname;
            req.Mobile = userData.Mobile;
            req.ModifiedDate = DateTime.Now;
            if(userData.DoB != null)
            {
                req.DateOfBirth = Convert.ToDateTime(userData.DoB);
            }

            _dbContext.Users.Update(req);
            _dbContext.SaveChanges();

            return Json("true");
        }

        [HttpPost]
        public IActionResult CheckServiceDT()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if(Uid != null)
            {
                var req = _dbContext.ServiceRequests.Where(x => x.UserId == Uid).ToList();

                if (req.Count > 0)
                {
                    foreach (var item in req)
                    {
                        if(DateTime.Now >= item.ServiceStartDate && item.Status == null)
                        {
                            item.Status = 0;
                            item.Comments = "Out of Time";
                            item.ModifiedDate = DateTime.Now;

                            _dbContext.ServiceRequests.Update(item);
                            _dbContext.SaveChanges();
                        }
                    }
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
        public IActionResult GetDashData()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            List<GetServiceReqDataVM> custDashData = new();

            var ReqData = _dbContext.ServiceRequests.Where(x => x.UserId == Uid).ToList();

            if(ReqData.Count > 0)
            {
                foreach (var item in ReqData)
                {
                    GetServiceReqDataVM res = new();
                    res.ServiceId = item.ServiceRequestId;
                    res.ServiceDate = item.ServiceStartDate.ToString("dd/MM/yyyy");
                    res.ServiceStartTime = item.ServiceStartDate.ToString("HH:mm");
                    res.ServiceEndTime = item.ServiceStartDate.AddHours((double)item.SubTotal).ToString("HH:mm");
                    res.TotalCost = item.TotalCost;
                    res.Status = item.Status;

                    if (item.ServiceProviderId != null)
                    {
                        User spData = _dbContext.Users.FirstOrDefault(x => x.UserId == item.ServiceProviderId);
                        res.SpName = spData.FirstName + " " + spData.LastName;
                        res.SpAvtar = spData.UserProfilePicture;
                        res.SpID = item.ServiceProviderId;
                        var rating = _dbContext.Ratings.Where(x => x.RatingTo == item.ServiceProviderId);
                        if (rating.Count() > 0)
                        {
                            res.SpRatings = Math.Round(rating.Average(x => x.Ratings), 1);
                        }
                        else
                        {
                            res.SpRatings = 0;
                        }
                    }

                    custDashData.Add(res);
                }

                return new JsonResult(custDashData);

            }
            else
            {
                return Json("notfound");
            }
        }

        [HttpGet]
        public IActionResult GetSerHistoryData()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            List<GetServiceReqDataVM> getSerHistoryData = new();

            var reqData = _dbContext.ServiceRequests.Where(x => x.UserId == Uid).ToList();

            if(reqData.Count > 0)
            {
                foreach (var item in reqData)
                {
                    GetServiceReqDataVM res = new();
                    res.ServiceId = item.ServiceRequestId;
                    res.ServiceDate = item.ServiceStartDate.ToString("dd/MM/yyyy");
                    res.ServiceStartTime = item.ServiceStartDate.ToString("HH:mm");
                    res.ServiceEndTime = item.ServiceStartDate.AddHours((double)item.SubTotal).ToString("HH:mm");
                    res.TotalCost = item.TotalCost;
                    res.Status = item.Status;

                    if(item.ServiceProviderId != null)
                    {
                        User spData = _dbContext.Users.FirstOrDefault(x => x.UserId == item.ServiceProviderId);
                        res.SpName = spData.FirstName + " " + spData.LastName;
                        res.SpAvtar = spData.UserProfilePicture;
                        res.SpID = item.ServiceProviderId;
                        var rating = _dbContext.Ratings.Where(x => x.RatingTo == item.ServiceProviderId);
                        if(rating.Count() > 0)
                        {
                            res.SpRatings = Math.Round(rating.Average(x => x.Ratings), 1);
                        }
                        else
                        {
                            res.SpRatings = 0;
                        }
                    }

                    getSerHistoryData.Add(res);
                }
                return new JsonResult(getSerHistoryData);
            }
            else
            {
                return Json("notfound");
            }
        }

        [HttpPost]
        public IActionResult CancelReq(ServiceRequest service)
        {
            ServiceRequest req = _dbContext.ServiceRequests.FirstOrDefault(x => x.ServiceRequestId == service.ServiceRequestId);

            //Status
            //    0 => Cancelled
            //    1 => Completed

            req.Status = 0;
            req.Comments = service.Comments;
            req.ModifiedDate = DateTime.Now;

            var obj = new
            {
                msg = "true",
                id= req.ServiceRequestId
            };
            _dbContext.ServiceRequests.Update(req);
            _dbContext.SaveChanges();

            //Mailing SP
            if(req.ServiceProviderId != null)
            {
                var spData = _dbContext.Users.FirstOrDefault(x => x.UserId == req.ServiceProviderId);

                string Subject = "Cancellation of Service Request";
                string Body = "<h2 style='text-align: center; background-color: #1D7A8C; color: white; padding: 10px 0; font-family: sans-serif;' > Helperland | Home Services </h2>" + "<span style='margin: 5px 0; color: #646464; font-size: 16px; font-family: sans-serif;'> Hello " + spData.FirstName + ", <br> Service Request " + req.ServiceRequestId + " has been cancelled by customer.";
                MailMessage msg = new MailMessage();
                msg.Body = Body;
                msg.Subject = Subject;
                msg.From = new MailAddress("sm.project.workstation@gmail.com", "Helperland");
                msg.To.Add(spData.Email);
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
            //Mailing SP

            return Json(obj);
        }

        [HttpPost]
        public IActionResult RescheduleDT(GetServiceReqDataVM service)
        {
            ServiceRequest req = _dbContext.ServiceRequests.FirstOrDefault(x => x.ServiceRequestId == service.ServiceId);
            
            if(req.ServiceProviderId == null)
            {
                req.ServiceStartDate = DateTime.ParseExact(service.ServiceDate, "d/M/yyyy HH:mm", null);
                req.ModifiedDate = DateTime.Now;

                _dbContext.ServiceRequests.Update(req);
                _dbContext.SaveChanges();

                return Json("true");
            }
            else
            {
                var check = _dbContext.ServiceRequests.Where(x => x.ServiceProviderId == req.ServiceProviderId && x.Status == null && x.ServiceRequestId != req.ServiceRequestId).ToList();

                if (check.Count() > 0)
                {
                    var conflict = false;
                    var sDt = "";
                    var eDt = "";

                    foreach (var i in check)
                    {
                        var newSerStartDT = DateTime.ParseExact(service.ServiceDate, "d/M/yyyy HH:mm", null);
                        var newSerEndDT = DateTime.ParseExact(service.ServiceDate, "d/M/yyyy HH:mm", null).AddHours((double)req.SubTotal);
                        var accSerStartDT = i.ServiceStartDate;
                        var accSerEndDT = i.ServiceStartDate.AddHours((double)i.SubTotal + 1);

                        if (newSerStartDT >= accSerStartDT && newSerStartDT <= accSerEndDT)
                        {
                            conflict = true;
                            sDt = accSerStartDT.ToString();
                            eDt = accSerEndDT.ToString();
                            break;
                        }
                        else if (newSerEndDT >= accSerStartDT && newSerEndDT <= accSerEndDT)
                        {
                            conflict = true;
                            sDt = accSerStartDT.ToString();
                            eDt = accSerEndDT.ToString();
                            break;

                        }
                        else if (newSerStartDT < accSerStartDT && newSerEndDT > accSerEndDT)
                        {
                            conflict = true;
                            sDt = accSerStartDT.ToString();
                            eDt = accSerEndDT.ToString();
                            break;
                        }
                    }

                    if (conflict)
                    {
                        var obj = new
                        {
                            msg = "false",
                            startDate = sDt,
                            endDate = eDt
                        };
                        return Json(obj);
                    }
                    else
                    {
                        req.ServiceStartDate = DateTime.ParseExact(service.ServiceDate, "d/M/yyyy HH:mm", null);
                        req.ModifiedDate = DateTime.Now;

                        _dbContext.ServiceRequests.Update(req);
                        _dbContext.SaveChanges();

                        //Mailing SP

                        var spData = _dbContext.Users.FirstOrDefault(x => x.UserId == req.ServiceProviderId);
                        var newSerStartDT = DateTime.ParseExact(service.ServiceDate, "d/M/yyyy HH:mm", null);
                        var newSerEndDT = DateTime.ParseExact(service.ServiceDate, "d/M/yyyy HH:mm", null).AddHours((double)req.SubTotal);

                        string Subject = "Reschedule Service Request";
                        string Body = "<h2 style='text-align: center; background-color: #1D7A8C; color: white; padding: 10px 0; font-family: sans-serif;' > Helperland | Home Services </h2>" + "<span style='margin: 5px 0; color: #646464; font-size: 16px; font-family: sans-serif;'> Hello " + spData.FirstName + ", <br> Service Request "+ req.ServiceRequestId +" has been rescheduled by customer. New date and time are "+ DateTime.ParseExact(service.ServiceDate, "d/M/yyyy HH:mm", null) +" to "+ newSerEndDT.ToString("t");
                        MailMessage msg = new MailMessage();
                        msg.Body = Body;
                        msg.Subject = Subject;
                        msg.From = new MailAddress("sm.project.workstation@gmail.com", "Helperland");
                        msg.To.Add(spData.Email);
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
                        //Mailing SP

                        return Json("true");
                    }
                }
                else
                {
                    req.ServiceStartDate = DateTime.ParseExact(service.ServiceDate, "d/M/yyyy HH:mm", null);
                    req.ModifiedDate = DateTime.Now;

                    _dbContext.ServiceRequests.Update(req);
                    _dbContext.SaveChanges();

                    //Mailing SP

                    var spData = _dbContext.Users.FirstOrDefault(x => x.UserId == req.ServiceProviderId);
                    var newSerStartDT = DateTime.ParseExact(service.ServiceDate, "d/M/yyyy HH:mm", null);
                    var newSerEndDT = DateTime.ParseExact(service.ServiceDate, "d/M/yyyy HH:mm", null).AddHours((double)req.SubTotal);

                    string Subject = "Reschedule Service Request";
                    string Body = "<h2 style='text-align: center; background-color: #1D7A8C; color: white; padding: 10px 0; font-family: sans-serif;' > Helperland | Home Services </h2>" + "<span style='margin: 5px 0; color: #646464; font-size: 16px; font-family: sans-serif;'> Hello " + spData.FirstName + ", <br> Service Request " + req.ServiceRequestId + " has been rescheduled by customer. New date and time are " + DateTime.ParseExact(service.ServiceDate, "d/M/yyyy HH:mm", null) + " to " + newSerEndDT.ToString("t");
                    MailMessage msg = new MailMessage();
                    msg.Body = Body;
                    msg.Subject = Subject;
                    msg.From = new MailAddress("sm.project.workstation@gmail.com", "Helperland");
                    msg.To.Add(spData.Email);
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
                    //Mailing SP

                    return Json("true");
                }
            }
        }

        [HttpPost]
        public IActionResult AddAddressAcc(UserAddress userAdd)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if(Uid != null)
            {
                User req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

                userAdd.UserId = req.UserId;
                userAdd.Email = req.Email;
                userAdd.IsDefault = false;
                userAdd.IsDeleted = false;

                _dbContext.UserAddresses.Add(userAdd);
                _dbContext.SaveChanges();

                return Json("true");
            }
            else
            {
                return Json("notfound");
            }
        }

        [HttpPost]
        public IActionResult EditAddressAcc(UserAddress userAdd)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");

            if(Uid != null)
            {
                User req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

                userAdd.UserId = req.UserId;
                userAdd.Email = req.Email;

                _dbContext.UserAddresses.Update(userAdd);
                _dbContext.SaveChanges();

                return Json("true");
            }
            else
            {
                return Json("notfound");
            }
        }

        [HttpPost]
        public IActionResult DeleteAddress(GetAddressVM delAdd)
        {
            UserAddress userAdd = _dbContext.UserAddresses.FirstOrDefault(x => x.AddressId == delAdd.Id);

            userAdd.IsDeleted = true;

            _dbContext.UserAddresses.Update(userAdd);
            _dbContext.SaveChanges();

            return Json("true");
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
        public IActionResult RateSP(Rating rating)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                rating.RatingFrom =(int) Uid;
                rating.RatingDate = DateTime.Now;
                rating.Ratings = (rating.OnTimeArrival + rating.Friendly + rating.QualityOfService) / 3;

                _dbContext.Ratings.Add(rating);
                _dbContext.SaveChanges();

                return Json("true");
            }
            else
            {
                return Json("notfound");
            }
        }

        [HttpGet]
        public IActionResult GetRateModalData(int reqId)
        {
            Rating rating = _dbContext.Ratings.FirstOrDefault(x => x.ServiceRequestId == reqId);

            if (rating != null)
            {
                var obj = new
                {
                    ontime = rating.OnTimeArrival,
                    friendly = rating.Friendly,
                    qos = rating.QualityOfService,
                    comment = rating.Comments
                };

                return Json(obj);
            }
            else
            {
                return Json("NoRating");
            }
        }

        [HttpPost]
        public IActionResult FavCustomer(int ID)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                if (_dbContext.FavoriteAndBlockeds.Any(x => x.UserId == Uid && x.TargetUserId == ID))
                {
                    FavoriteAndBlocked req = _dbContext.FavoriteAndBlockeds.FirstOrDefault(x => x.UserId == Uid && x.TargetUserId == ID);
                    req.IsFavorite = true;
                    req.IsBlocked = false;

                    _dbContext.FavoriteAndBlockeds.Update(req);
                    _dbContext.SaveChanges();
                }
                else
                {
                    FavoriteAndBlocked req = new();
                    req.UserId = (int)Uid;
                    req.TargetUserId = ID;
                    req.IsFavorite = true;
                    req.IsBlocked = false;

                    _dbContext.FavoriteAndBlockeds.Add(req);
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
        public IActionResult UnfavCustomer(int ID)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                if (_dbContext.FavoriteAndBlockeds.Any(x => x.UserId == Uid && x.TargetUserId == ID))
                {
                    FavoriteAndBlocked req = _dbContext.FavoriteAndBlockeds.FirstOrDefault(x => x.UserId == Uid && x.TargetUserId == ID);
                    req.IsFavorite = false;

                    _dbContext.FavoriteAndBlockeds.Update(req);
                    _dbContext.SaveChanges();
                }
                else
                {
                    FavoriteAndBlocked req = new();
                    req.UserId = (int)Uid;
                    req.TargetUserId = ID;
                    req.IsFavorite = false;
                    req.IsBlocked = false;

                    _dbContext.FavoriteAndBlockeds.Add(req);
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
        public IActionResult BlockCustomer(int ID)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                if (_dbContext.FavoriteAndBlockeds.Any(x => x.UserId == Uid && x.TargetUserId == ID))
                {
                    FavoriteAndBlocked req = _dbContext.FavoriteAndBlockeds.FirstOrDefault(x => x.UserId == Uid && x.TargetUserId == ID);
                    req.IsFavorite = false;
                    req.IsBlocked = true;

                    _dbContext.FavoriteAndBlockeds.Update(req);
                    _dbContext.SaveChanges();
                }
                else
                {
                    FavoriteAndBlocked req = new();
                    req.UserId = (int)Uid;
                    req.TargetUserId = ID;
                    req.IsFavorite = false;
                    req.IsBlocked = true;

                    _dbContext.FavoriteAndBlockeds.Add(req);
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
        public IActionResult UnblockCustomer(int ID)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if (Uid != null)
            {
                if (_dbContext.FavoriteAndBlockeds.Any(x => x.UserId == Uid && x.TargetUserId == ID))
                {
                    FavoriteAndBlocked req = _dbContext.FavoriteAndBlockeds.FirstOrDefault(x => x.UserId == Uid && x.TargetUserId == ID);
                    req.IsBlocked = false;

                    _dbContext.FavoriteAndBlockeds.Update(req);
                    _dbContext.SaveChanges();
                }
                else
                {
                    FavoriteAndBlocked req = new();
                    req.UserId = (int)Uid;
                    req.TargetUserId = ID;
                    req.IsFavorite = false;
                    req.IsBlocked = false;

                    _dbContext.FavoriteAndBlockeds.Add(req);
                    _dbContext.SaveChanges();
                }

                return Json("true");
            }
            else
            {
                return Json("notfound");
            }
        }
    }
}
