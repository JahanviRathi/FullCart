using FullCart_WebAPI.Models;

namespace FullCart_WebAPI.Services.Interface
{
    public interface IAuthService
    {
        Task<User?> GetUser(string email);
        Task<User?> Register(UserSignUpRequest request);
        Task<string> Login(UserLoginRequest request);
    }
}
