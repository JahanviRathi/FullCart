using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullCart_WebAPI.Models
{
    public class WishlistItem
    {
        [ForeignKey("ItemId")]
        public Item? Item { get; set; }

        public int ItemId { get; set; }

        [ForeignKey("WishlistId")]
        public Wishlist? Wishlist { get; set; }

        public int WishlistId { get; set; }

        [Key]
        public int WishlistItemId { get; set; }
    }
}