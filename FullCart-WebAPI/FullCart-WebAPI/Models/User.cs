using System.ComponentModel.DataAnnotations;

namespace FullCart_WebAPI.Models
{
    public class User
    {
        public string Email { get; set; } = string.Empty;

        [Key]
        public int Id { get; set; }

        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public string Role { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
    }
}