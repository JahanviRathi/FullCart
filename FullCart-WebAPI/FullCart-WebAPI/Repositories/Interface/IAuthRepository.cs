using FullCart_WebAPI.Models;

namespace FullCart_WebAPI.Repositories.Interface
{
    public interface IAuthRepository
    {
        Task<User?> Register(UserSignUpRequest request, byte[] passwordHash, byte[] passwordSalt);
        Task<User?> FindUser(string email);
    }
}
