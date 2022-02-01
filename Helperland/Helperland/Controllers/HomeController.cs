using Helperland.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Helperland.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
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

        [Route("becomeProvider")]
        public IActionResult BecomePro()
        {
            return View();
        }

        [Route("contact")]
        public IActionResult Contact()
        {
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