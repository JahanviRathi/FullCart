using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullCart_WebAPI.Models
{
    public class Cart
    {
        [Key]
        public int CartId { get; set; }

        public List<CartItem> CartItems { get; set; } = new List<CartItem>();

        public int TotalQuantity { get; set; }

        public decimal TotalPrice { get; set; }

        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public User? User { get; set; }
    }
}
