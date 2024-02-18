using FullCart_WebAPI.Models;

namespace FullCart_WebAPI.Repositories.Interface
{
    public interface ICartRepository
    {
        Task<Cart?> AddItemsToCart(CartItem cartItem, int CustomerId);
        Task EmptyCart(int CustomerId);
        Task<Cart?> GetCartItems(int CustomerId);
        Task<Cart?> RemoveItemsFromCart(int itemId, int CustomerId);
    }
}
