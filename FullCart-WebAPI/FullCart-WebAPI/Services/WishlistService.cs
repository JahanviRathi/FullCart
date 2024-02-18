using FullCart_WebAPI.Models;
using FullCart_WebAPI.Repositories.Interface;
using FullCart_WebAPI.Services.Interface;

namespace FullCart_WebAPI.Services
{
    public class WishlistService : IWishlistService
    {
        private readonly IWishlistRepository _wishlistRepository;

        public WishlistService(IWishlistRepository wishlistRepository)
        {
            _wishlistRepository = wishlistRepository;
        }

        public async Task<Wishlist?> AddItemsToWishList(WishlistItem wishListItem, int CustomerId)
        {
            var wishlistWithCustomerId = await _wishlistRepository.AddItemsToWishlist(wishListItem, CustomerId);
            return wishlistWithCustomerId;
        }

        public async Task EmptyWishList(int CustomerId)
        {
            await _wishlistRepository.EmptyWishlist(CustomerId);
        }

        public async Task<Wishlist?> GetWishListItems(int CustomerId)
        {
            var wishlistWithCustomerId = await _wishlistRepository.GetWishlistItems(CustomerId);
            return wishlistWithCustomerId;
        }

        public async Task<Wishlist?> RemoveItemsFromWishList(int itemId, int CustomerId)
        {
            var wishlistWithCustomerId = await _wishlistRepository.RemoveItemsFromWishlist(itemId, CustomerId);
            return wishlistWithCustomerId;
        }
    }
}
