using Helperland.Data;
using Helperland.Models.viewModels;
using Helperland.Models;
using Microsoft.AspNetCore.Mvc;
using System;

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
            if (Uid != null)
            {
                var req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

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
                return View();
            }
            else
            {
                ViewBag.UType = 1;
                return RedirectToAction("Index", "Home", new { login = "true" });
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

            var userAddresses = _dbContext.UserAddresses.Where(x=>x.UserId == Uid && x.PostalCode == zipCode).ToList();

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
                    add.IsDefault = item.IsDefault;

                    addresses.Add(add);
                }
                return new JsonResult(addresses);
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

                var ServiceRequest =_dbContext.ServiceRequests.Add(req);
                _dbContext.SaveChanges();

                UserAddress userReq = _dbContext.UserAddresses.FirstOrDefault(x => x.AddressId == completeBook.AddressId);
                var city = _dbContext.Cities.FirstOrDefault(x => x.CityName == userReq.City);
                var state = _dbContext.States.FirstOrDefault(x => x.Id == city.StateId);

                ServiceRequestAddress serviceRequestAddress = new();
                serviceRequestAddress.AddressLine1 = userReq.AddressLine1;
                serviceRequestAddress.AddressLine2= userReq.AddressLine2;
                serviceRequestAddress.City = userReq.City;
                serviceRequestAddress.PostalCode = userReq.PostalCode;
                serviceRequestAddress.State = state.StateName;
                serviceRequestAddress.Mobile = userReq.Mobile;
                serviceRequestAddress.ServiceRequestId = ServiceRequest.Entity.ServiceRequestId;

                _dbContext.ServiceRequestAddresses.Add(serviceRequestAddress);
                _dbContext.SaveChanges();

                if (completeBook.Cabinet)
                {
                    ServiceRequestExtra requestExtra = new ();
                    requestExtra.ServiceRequestId = ServiceRequest.Entity.ServiceRequestId;
                    requestExtra.ServiceExtraId = 1;
                    _dbContext.ServiceRequestExtras.Add(requestExtra);
                    _dbContext.SaveChanges();
                }
                
                if (completeBook.Fridge)
                {
                    ServiceRequestExtra requestExtra = new ();
                    requestExtra.ServiceRequestId = ServiceRequest.Entity.ServiceRequestId;
                    requestExtra.ServiceExtraId = 2;
                    _dbContext.ServiceRequestExtras.Add(requestExtra);
                    _dbContext.SaveChanges();
                }
                
                if (completeBook.Oven)
                {
                    ServiceRequestExtra requestExtra = new ();
                    requestExtra.ServiceRequestId = ServiceRequest.Entity.ServiceRequestId;
                    requestExtra.ServiceExtraId = 3;
                    _dbContext.ServiceRequestExtras.Add(requestExtra);
                    _dbContext.SaveChanges();
                }
                
                if (completeBook.Wash)
                {
                    ServiceRequestExtra requestExtra = new ();
                    requestExtra.ServiceRequestId = ServiceRequest.Entity.ServiceRequestId;
                    requestExtra.ServiceExtraId = 4;
                    _dbContext.ServiceRequestExtras.Add(requestExtra);
                    _dbContext.SaveChanges();
                }
                
                if (completeBook.Windows)
                {
                    ServiceRequestExtra requestExtra = new ();
                    requestExtra.ServiceRequestId = ServiceRequest.Entity.ServiceRequestId;
                    requestExtra.ServiceExtraId = 5;
                    _dbContext.ServiceRequestExtras.Add(requestExtra);
                    _dbContext.SaveChanges();
                }

                return Json(ServiceRequest.Entity.ServiceRequestId);

            }
            else
            {
                return Json("false");
            }
        }

        public IActionResult Dashboard()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if(Uid != null)
            {
                var req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

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

        public IActionResult Myaccount()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if(Uid != null)
            {
                var req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);

                ViewBag.IsloggedIn = "success";
                ViewBag.Uname = req.FirstName;
                ViewBag.UType = req.UserTypeId;

                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
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

            var userAddresses = _dbContext.UserAddresses.Where(x => x.UserId == Uid).ToList();

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
                    add.IsDefault = item.IsDefault;

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
        public IActionResult getDataAcc()
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

            if(userData.DoB != null)
            {
                req.DateOfBirth = Convert.ToDateTime(userData.DoB);
            }

            _dbContext.Users.Update(req);
            _dbContext.SaveChanges();

            return Json("true");
        }
    }
}
