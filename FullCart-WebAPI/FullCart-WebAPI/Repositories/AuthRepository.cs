using FullCart_WebAPI.Data;
using FullCart_WebAPI.Models;
using FullCart_WebAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace FullCart_WebAPI.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _dataContext;

        public AuthRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<User?> Register(UserSignUpRequest request, byte[] passwordHash, byte[] passwordSalt)
        {
            var existingUser = await FindUser(request.Email);
            if (existingUser == null)
            {
                var user = new User
                {
                    Username = request.UserName,
                    Email = request.Email,
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    Role = request.Role
                };

                _dataContext.Users.Add(user);
                await _dataContext.SaveChangesAsync();

                return await FindUser(request.Email);
            }
            return null;
        }

        public async Task<User?> FindUser(string email)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(user => user.Email.Equals(email));
            return user;
        }
    }
}