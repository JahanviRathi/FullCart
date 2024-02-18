using FullCart_WebAPI.Data;
using FullCart_WebAPI.Models;
using FullCart_WebAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml.Style;

namespace FullCart_WebAPI.Repositories
{
    public class OrderRepository: IOrderRepository
    {
        private readonly DataContext _dataContext;

        public OrderRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Order?> PlaceOrder(List<OrderItem> orderItems, ShippingDetail shippingDetail, int CustomerId)
        {
            await SetShippingDetails(shippingDetail);

            var order = new Order
            {
                CustomerId = CustomerId,
                ShippingDetailId = shippingDetail.ShippingDetailId,
                DatePlaced = DateTime.Now,
                Products = orderItems,
                Status = OrderStatus.OrderCreated
            };

            _dataContext.Orders.Add(order);
            await _dataContext.SaveChangesAsync();
            return await GetOrderById(order.OrderId);
        }

        public async Task<Order?> ChangeOrderStatus(int OrderId, int status)
        {
            var order = await GetOrderById(OrderId);

            if (order == null)
                return null;

            switch (status)
            {
                case 0:
                    order.Status = OrderStatus.OrderCreated;
                    break;
                case 1:
                    order.Status = OrderStatus.OrderCancelled;
                    break;
                case 2:
                    order.Status = OrderStatus.OrderDelivered;
                    break;
            }

            await _dataContext.SaveChangesAsync();
            return await GetOrderById(order.OrderId);
        } 

        public async Task<List<Order>> GetAllOrders()
        {
            var orderList = await _dataContext.Orders
                .Include(order => order.ShippingDetails)
                .Include(order => order.User)
                .ToListAsync();

            if (orderList.Count != 0)
            {
                foreach (var order in orderList)
                {
                    await GetOrdersWithOrderItems(order);
                }
            }

            return orderList;
        }

        public async Task<Order?> GetOrderById(int OrderId)
        {
            var order = await _dataContext.Orders
                .Include(order => order.ShippingDetails)
                .Include(order => order.User)
                .FirstOrDefaultAsync(order => order.OrderId == OrderId);

            if(order != null)
            {
                await GetOrdersWithOrderItems(order);
            }

            return order;
        }
        
        public async Task<List<Order>> GetOrderByCustomerId(int CustomerId)
        {
            var orderList = await _dataContext.Orders
                .Include(order => order.ShippingDetails)
                .Include(order => order.User)
                .Where(order => order.CustomerId == CustomerId)
                .ToListAsync();

            if(orderList.Count != 0)
            {
                foreach(var order in orderList)
                {
                    await GetOrdersWithOrderItems(order);
                }
            }

            return orderList;
        }

        private async Task GetOrdersWithOrderItems(Order order)
        {
            var orderItems = await _dataContext.OrderItems
                .Include(orderItem => orderItem.Item)
                .Where(orderItem => orderItem.OrderId == order.OrderId)
                .Select(orderItem => new OrderItem
                {
                    OrderId = order.OrderId,
                    OrderItemId = orderItem.OrderItemId,
                    Quantity = orderItem.Quantity,
                    Price = orderItem.Quantity * orderItem.Item!.Price,
                    ItemId = orderItem.ItemId,
                    Item = orderItem.Item
                })
                .ToListAsync();

            order.Products = orderItems;
        }

        private async Task SetShippingDetails(ShippingDetail shippingDetail)
        {
            _dataContext.ShippingDetails.Add(shippingDetail);
            await _dataContext.SaveChangesAsync();
        }
    }
}
