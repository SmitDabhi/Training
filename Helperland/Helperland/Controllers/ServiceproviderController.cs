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

        [HttpPost]
        public IActionResult PassChange(PassChangeVM passChangeVM)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            User req = _dbContext.Users.FirstOrDefault(y => y.UserId == Uid);

            if (BCrypt.Net.BCrypt.Verify(passChangeVM.OldPassword, req.Password))
            {
                if (ModelState.IsValid)
                {
                    if (passChangeVM.NewPassword == passChangeVM.ConfirmPassword)
                    {
                        if (BCrypt.Net.BCrypt.Verify(passChangeVM.NewPassword, req.Password))
                        {
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
        public IActionResult GetMyAccountData()
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if(Uid != null)
            {
                User data = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);
                if (data != null)
                {
                    SPAccountDataVM res = new();
                    res.Fname = data.FirstName;
                    res.Lname = data.LastName;
                    res.Email = data.Email;
                    res.Mobile = data.Mobile;
                    res.DOB = data.DateOfBirth;
                    res.Nationaity = data.NationalityId;
                    res.Gender = data.Gender;
                    res.Avatar = data.UserProfilePicture;
                    
                    var addDetails = _dbContext.UserAddresses.FirstOrDefault(x => x.UserId == data.UserId);
                    if(addDetails != null)
                    {
                        res.StreetName = addDetails.AddressLine1;
                        res.HouseNo = addDetails.AddressLine2;
                        res.PostalCode = addDetails.PostalCode;
                        res.City = addDetails.City;
                    }

                    return new JsonResult(res);
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
        public IActionResult UpdateSpData(SPAccountDataVM data)
        {
            int? Uid = HttpContext.Session.GetInt32("userid");
            if(Uid != null)
            {
                User req = _dbContext.Users.FirstOrDefault(x => x.UserId == Uid);
                req.FirstName = data.Fname;
                req.LastName = data.Lname;
                req.Email = data.Email;
                req.Mobile = data.Mobile;
                req.ZipCode = data.PostalCode;
                if(data.DOB != null)
                {
                    req.DateOfBirth = Convert.ToDateTime(data.DOB);
                }
                //Nationality
                //    1 => India
                //    2 => US
                //    0 => UK
                req.NationalityId = data.Nationaity;
                //Gender
                //    1 => Male
                //    2 => Female
                //    0 => Rather not to say
                req.Gender = data.Gender;
                req.UserProfilePicture = data.Avatar;
                req.ModifiedDate = DateTime.Now;

                _dbContext.Users.Update(req);
                _dbContext.SaveChanges();


                if(_dbContext.UserAddresses.Any(x => x.UserId == Uid))
                {
                    UserAddress reqAdd = _dbContext.UserAddresses.FirstOrDefault(x => x.UserId == Uid);
                    
                    if(!_dbContext.States.Any(x => x.StateName == data.State))
                    {
                        State st = new();
                        st.StateName = data.State;
                        _dbContext.States.Add(st);
                        _dbContext.SaveChanges();

                    }

                    if(!_dbContext.Cities.Any(x => x.CityName == data.City))
                    {
                        City ct = new();
                        ct.CityName = data.City;

                        var stateId = _dbContext.States.FirstOrDefault(x => x.StateName == data.State).Id;
                        ct.StateId = stateId;

                        _dbContext.Cities.Add(ct);
                        _dbContext.SaveChanges();
                    }

                    Zipcode zip = _dbContext.Zipcodes.FirstOrDefault(x => x.ZipcodeValue == reqAdd.PostalCode);
                    zip.ZipcodeValue = data.PostalCode;
                    
                    var cityId = _dbContext.Cities.FirstOrDefault(x => x.CityName == data.City).Id;
                    zip.CityId = cityId;

                    _dbContext.Zipcodes.Update(zip);
                    _dbContext.SaveChanges();

                    reqAdd.UserId = req.UserId;
                    reqAdd.AddressLine1 = data.StreetName;
                    reqAdd.AddressLine2 = data.HouseNo;
                    reqAdd.City = data.City;
                    if(data.State != null)
                    {
                        reqAdd.State = data.State;
                    }
                    reqAdd.PostalCode = data.PostalCode;
                    reqAdd.IsDefault = false;
                    reqAdd.IsDeleted = false;
                    reqAdd.Email = data.Email;
                    reqAdd.Mobile = data.Mobile;

                    _dbContext.UserAddresses.Update(reqAdd);
                    _dbContext.SaveChanges();
                }
                else
                {
                    UserAddress reqAdd = new();
                    reqAdd.UserId = req.UserId;
                    reqAdd.AddressLine1 = data.StreetName;
                    reqAdd.AddressLine2 = data.HouseNo;
                    reqAdd.City = data.City;
                    reqAdd.State = data.State;
                    reqAdd.PostalCode = data.PostalCode;
                    reqAdd.IsDefault = false;
                    reqAdd.IsDeleted = false;
                    reqAdd.Email = data.Email;
                    reqAdd.Mobile = data.Mobile;

                    _dbContext.UserAddresses.Add(reqAdd);
                    _dbContext.SaveChanges();

                    if(!_dbContext.States.Any(x => x.StateName == data.State))
                    {
                        State st = new();
                        st.StateName = data.State;
                        _dbContext.States.Add(st);
                        _dbContext.SaveChanges();

                    }

                    if(!_dbContext.Cities.Any(x => x.CityName == data.City))
                    {
                        City ct = new();
                        ct.CityName = data.City;

                        var stateId = _dbContext.States.FirstOrDefault(x => x.StateName == data.State).Id;
                        ct.StateId = stateId;

                        _dbContext.Cities.Add(ct);
                        _dbContext.SaveChanges();
                    }

                    Zipcode zip = new();
                    zip.ZipcodeValue = data.PostalCode;

                    var cityId = _dbContext.Cities.FirstOrDefault(x => x.CityName == data.City).Id;
                    zip.CityId = cityId;

                    _dbContext.Zipcodes.Add(zip);
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
