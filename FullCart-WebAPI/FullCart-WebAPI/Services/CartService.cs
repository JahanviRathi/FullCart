using FullCart_WebAPI.Models;
using FullCart_WebAPI.Repositories.Interface;
using FullCart_WebAPI.Services.Interface;

namespace FullCart_WebAPI.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;

        public CartService(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        public async Task<Cart?> AddItemsToCart(CartItem cartItem, int CustomerId)
        {
            var cartWithCustomerId = await _cartRepository.AddItemsToCart(cartItem, CustomerId);
            return cartWithCustomerId;
        }

        public async Task EmptyCart(int CustomerId)
        {
            await _cartRepository.EmptyCart(CustomerId);
        }

        public async Task<Cart?> GetCartItems(int CustomerId)
        {
            var cartWithCustomerId = await _cartRepository.GetCartItems(CustomerId);
            return cartWithCustomerId;
        }

        public async Task<Cart?> RemoveItemsFromCart(int itemId, int CustomerId)
        {
            var cartWithCustomerId = await _cartRepository.RemoveItemsFromCart(itemId, CustomerId);
            return cartWithCustomerId;
        }
    }
}
