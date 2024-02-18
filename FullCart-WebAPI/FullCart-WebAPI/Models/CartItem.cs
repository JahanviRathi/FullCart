using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullCart_WebAPI.Models
{
    public class CartItem
    {
        [Key]
        public int CartItemId { get; set; }

        public int QuantityInCart { get; set; }

        public int ItemId { get; set; }

        [ForeignKey("ItemId")]
        public Item? Item { get; set; }

        public int CartId { get; set; }

        [ForeignKey("CartId")]
        public Cart? Cart { get; set; }
    }
}
