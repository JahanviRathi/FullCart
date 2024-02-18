using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullCart_WebAPI.Models
{
    public class Wishlist
    {
        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public User? User { get; set; }

        [Key]
        public int WishlistId { get; set; }

        public List<WishlistItem> WishlistItems { get; set; } = new List<WishlistItem>();
    }
}