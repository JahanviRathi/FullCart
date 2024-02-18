using FullCart_WebAPI.Models;

namespace FullCart_WebAPI.Services.Interface
{
    public interface IOrderService
    {
        Task<Order?> SetOrderDetails(OrderPlaceRequest request);
        Task<Order?> GetOrderDetails(int orderId);
        Task<List<Order>> GetAllOrders();
        Task<List<Order>> GetOrdersByCustomerId(int CustomerId);
        Task<Order?> ChangeOrderStatus(int orderId, int status);
    }
}
