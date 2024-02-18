using FullCart_WebAPI.Models;

namespace FullCart_WebAPI.Services.Interface
{
    public interface ICartService
    {
        Task<Cart?> GetCartItems(int CustomerId);
        Task<Cart?> AddItemsToCart(CartItem cartItem, int CustomerId);
        Task<Cart?> RemoveItemsFromCart(int itemId, int CustomerId);
        Task EmptyCart(int CustomerId);
    }
}
