using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;

namespace LoggingInDotNet.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController : ControllerBase
{
    readonly ILogger<HomeController> _logger;
    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    [HttpGet("")]
    public IActionResult TestEndpoint()
    {
        return Ok();
    }
}