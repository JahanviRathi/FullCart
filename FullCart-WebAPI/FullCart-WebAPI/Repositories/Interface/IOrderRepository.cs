using FullCart_WebAPI.Models;

namespace FullCart_WebAPI.Repositories.Interface
{
    public interface IOrderRepository
    {
        Task<Order?> PlaceOrder(List<OrderItem> orderItems, ShippingDetail shippingDetail, int CustomerId);
        Task<Order?> ChangeOrderStatus(int OrderId, int status);
        Task<List<Order>> GetAllOrders();
        Task<Order?> GetOrderById(int OrderId);
        Task<List<Order>> GetOrderByCustomerId(int CustomerId);
    }
}
