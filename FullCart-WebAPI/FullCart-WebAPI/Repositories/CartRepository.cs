using FullCart_WebAPI.Data;
using FullCart_WebAPI.Models;
using FullCart_WebAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace FullCart_WebAPI.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly DataContext _dataContext;

        public CartRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Cart?> AddItemsToCart(CartItem cartItem, int CustomerId)
        {
            var cart = await GetCartItems(CustomerId);

            await LoadAndSetItem(cartItem);

            if (cart == null)
            {
                cartItem.Item = await _dataContext.Items.FindAsync(cartItem.ItemId);
                cart = new Cart
                {
                    CustomerId = CustomerId,
                    CartItems = new List<CartItem> { cartItem }
                };
                _dataContext.Carts.Add(cart);
            }
            else
            {
                var existingItem = cart.CartItems.FirstOrDefault(existingCartItem => existingCartItem.ItemId == cartItem.ItemId);

                if (existingItem != null)
                {
                    existingItem.QuantityInCart += cartItem.QuantityInCart;
                }
                else
                {
                    cart.CartItems.Add(cartItem);
                }
            }

            UpdateCartTotals(cart);

            await _dataContext.SaveChangesAsync();
            return await GetCartItems(CustomerId);
        }

        public async Task EmptyCart(int CustomerId)
        {
            var cart = await _dataContext.Carts.FirstOrDefaultAsync(cart => cart.CustomerId == CustomerId); ;
            if (cart != null)
            {
                _dataContext.Carts.Remove(cart);
                await _dataContext.SaveChangesAsync();
            }
        }

        public async Task<Cart?> GetCartItems(int CustomerId)
        {
            var cartWithCustomerId = await _dataContext.Carts
                .Include(cart => cart.User)
                .FirstOrDefaultAsync(cart => cart.CustomerId == CustomerId);

            if (cartWithCustomerId != null)
            {
                await GetCartWithItems(cartWithCustomerId);
            }

            return cartWithCustomerId;
        }

        public async Task<Cart?> RemoveItemsFromCart(int itemId, int CustomerId)
        {
            var cart = await _dataContext.Carts
                    .Include(cart => cart.CartItems)
                    .ThenInclude(cartItem => cartItem.Item)
                    .FirstOrDefaultAsync(cart => cart.CustomerId == CustomerId);

            if (cart == null)
                return null;

            var cartItem = await _dataContext.CartItems
                .FirstOrDefaultAsync(cartItem => cartItem.ItemId == itemId && cartItem.CartId == cart.CartId);
            if (cartItem == null)
                return null;

            cart.CartItems.Remove(cartItem);

            UpdateCartTotals(cart);

            await _dataContext.SaveChangesAsync();
            return await GetCartItems(CustomerId);
        }

        private async Task GetCartWithItems(Cart cartWithCustomerId)
        {
            var cartItems = await _dataContext.CartItems
                .Include(cartItem => cartItem.Item)
                .Where(cartItem => cartItem.CartId == cartWithCustomerId!.CartId)
                .Select(cartItem => new CartItem
                {
                    CartId = cartItem.CartId,
                    CartItemId = cartItem.CartItemId,
                    QuantityInCart = cartItem.QuantityInCart,
                    ItemId = cartItem.ItemId,
                    Item = cartItem.Item,
                }).ToListAsync();

            cartWithCustomerId.CartItems = cartItems;
        }

        private void UpdateCartTotals(Cart cart)
        {
            cart.TotalQuantity = cart.CartItems.Sum(cartItem => cartItem.QuantityInCart);
            cart.TotalPrice = cart.CartItems.Sum(cartItem => cartItem.QuantityInCart * cartItem.Item!.Price);
        }

        private async Task LoadAndSetItem(CartItem cartItem)
        {
            if (cartItem.ItemId != 0)
            {
                var existingItem = await _dataContext.Items.FindAsync(cartItem.ItemId);
                if (existingItem != null)
                {
                    cartItem.Item = existingItem;
                }
            }
        }
    }
}