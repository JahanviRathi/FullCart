using FullCart_WebAPI.Models;
using FullCart_WebAPI.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace FullCart_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user = new User();
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserSignUpRequest request)
        {
            var user = await _authService.Register(request);
            if (user == null)
            {
                return BadRequest("This email already exists");
            }
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserLoginRequest request)
        {
            var token = await _authService.Login(request);

            if (token.Equals("No such user found!") || token.Equals("Wrong Password"))
                return BadRequest(token);

            return Ok(token);
        }

        [HttpGet("user/{email}")]
        public async Task<ActionResult<User>> GetUser(string email)
        {
            var user = await _authService.GetUser(email);
            if (user == null)
            {
                return BadRequest("No such user found!");
            }
            return Ok(user);
        }
    }
}