using FullCart_WebAPI.Models;
using FullCart_WebAPI.Repositories.Interface;
using FullCart_WebAPI.Services.Interface;

namespace FullCart_WebAPI.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        
        public async Task<Order?> ChangeOrderStatus(int orderId, int status)
        {
            var order = await _orderRepository.ChangeOrderStatus(orderId, status);
            return order;
        }

        public async Task<List<Order>> GetAllOrders()
        {
            var allOrders = await _orderRepository.GetAllOrders();
            return allOrders;
        }
        
        public async Task<List<Order>> GetOrdersByCustomerId(int CustomerId)
        {
            var orderList = await _orderRepository.GetOrderByCustomerId(CustomerId);
            return orderList;
        }

        public async Task<Order?> GetOrderDetails(int orderId)
        {
            var order = await _orderRepository.GetOrderById(orderId);
            return order;
        }

        public async Task<Order?> SetOrderDetails(OrderPlaceRequest request)
        {
            var orderPlaced = await _orderRepository.PlaceOrder(request.orderItems!, request.shippingDetail!, request.CustomerId);
            return orderPlaced;
        }
    }
}
