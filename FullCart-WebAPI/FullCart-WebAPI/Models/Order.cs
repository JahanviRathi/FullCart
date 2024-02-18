using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullCart_WebAPI.Models
{
    public enum OrderStatus {
        OrderCreated,
        OrderCancelled,
        OrderDelivered
    }

    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public DateTime DatePlaced { get; set; }
        public List<OrderItem>? Products { get; set; }
        public OrderStatus Status { get; set; }

        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public User? User { get; set; }
        
        public int ShippingDetailId { get; set; }

        [ForeignKey("ShippingDetailId")]
        public ShippingDetail? ShippingDetails { get; set; }
    }
}
