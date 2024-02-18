namespace FullCart_WebAPI.Models
{
    public class OrderPlaceRequest
    {
        public List<OrderItem>? orderItems {  get; set; }
        public ShippingDetail? shippingDetail { get; set; }
        public int CustomerId { get; set; }
    }
}
